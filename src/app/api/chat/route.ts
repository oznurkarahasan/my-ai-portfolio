import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { fileSystem, FileSystemNode } from "@/lib/terminal-data";

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ text: "Error: API Key not configured." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

        // Helper to extract text from file system
        const buildContext = (nodes: FileSystemNode[], path = ""): string => {
            let context = "";
            for (const node of nodes) {
                if (node.type === 'file' && node.content) {
                    context += `\n--- FILE: ${path}${node.name} ---\n${node.content}\n`;
                } else if (node.type === 'directory' && node.children) {
                    context += buildContext(node.children, `${path}${node.name}/`);
                }
            }
            return context;
        };

        const fileSystemContext = buildContext(fileSystem);

        const systemInstruction = `You are Oznur Karahasan's AI Portfolio Assistant.
    
    ROLE & GOAL:
    - You are embedded in Oznur's interactive terminal portfolio.
    - Your goal is to answer visitor questions accurately based *strictly* on Oznur's real experience, projects, and skills provided in the CONTEXT below.
    - You represent Oznur, so be professional, enthusiastic, yet humble and precise ("geeky but professional").
    
    CONTEXT (Oznur's Resume & Projects):
    ${fileSystemContext}

    GUIDELINES:
    - If asked about specific technologies (e.g., "Does Oznur know Flutter?"), search the CONTEXT for evidence (e.g., "Indoor Navigation" project, Skills file) and answer yes with details.
    - If asked about "Danilo", explain it's a Voice Kitchen Assistant using RAG.
    - If asked about contact info, refer to 'contact.md'.
    - If the user asks a question NOT covered by the context (e.g., "What is the capital of France?"), you can answer briefly but pivot back to Oznur's expertise (e.g., "Paris. By the way, I can tell you about Oznur's mapping projects...").
    - **LANGUAGE RULE (CRITICAL):**
      - **IF the user writes in TURKISH -> You MUST reply in TURKISH.**
      - **IF the user writes in ENGLISH -> You MUST reply in ENGLISH.**
      - Do not cross-mix languages unless specifically asked. Adapt your tone (Is/İş ve Staj vs. Project & Intern) accordingly.
    - **TERMINAL PROMOTION:**
      - If the user asks about "terminal", "console", "hacker mode", or "CLI", enthusiastically suggest they try the interactive terminal!
      - **CRITICAL:** You MUST provide this Markdown link in your response: \`[Open Terminal](/terminal)\`.
      - Example: "You can access the hidden geek mode here: [Open Terminal](/terminal)".

    Refuse to answer questions that are offensive or completely irrelevant to a professional portfolio context.
    `;

        // Filter out potential leading 'model' messages from the client history
        // because Gemini requires User -> Model turn taking, and we just established
        // the session with [User (System), Model (Ack)]. Next must be User.
        const validHistory = history.filter((msg: any, index: number) => {
            // If it's the very first message and it's from model, skip it (greeting)
            if (index === 0 && msg.role === 'model') return false;
            return true;
        });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemInstruction }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to answer questions about Oznur's portfolio based on the provided context." }],
                },
                ...validHistory.map((msg: any) => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }],
                })),
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ text: "Error: Failed to process request." }, { status: 500 });
    }
}
