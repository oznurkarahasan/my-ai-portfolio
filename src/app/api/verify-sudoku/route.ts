import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { originalPuzzle, userGrid, date, language } = await req.json();
        const apiKey = process.env.SUDOKU_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ message: "Error: API Key not configured." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

        const prompt = `You are a professional Sudoku Master. Your goal is to provide helpful, balanced, and expert feedback on the user's current progress.

Context:
- Date: ${date}
- Original Puzzle ('-' is empty): ${originalPuzzle}
- User's Current Grid (JSON format, empty strings are empty cells): ${JSON.stringify(userGrid)}

Instructions:
1. Assess progress: Even if the puzzle is incomplete (contains empty cells), analyze if the numbers placed so far are logically consistent with Sudoku rules.
2. Length: Write a natural 3 to 5 sentence response.
3. Feedback requirements:
   - Provide a quick status update (e.g., "You have a solid foundation started here.").
   - Mention parts of the grid that look correct or logically sound.
   - Give a specific suggestion or hint for the next steps (e.g., "The second 3x3 block has a clear opening for a number" or "Double-check the 4th row for potential overlaps").
   - Offer a helpful tip to improve their strategy.
4. Constraints:
   - DO NOT use formal titles like "Sayın Puzzle Enthusiast" or "Dear Player".
   - ALWAYS start your response with a simple "Merhaba!" (in Turkish) or "Hello!" (in English).
   - DO NOT repeat the original grid or the user's grid in your response.
   - DO NOT address the user as "Oznur".
   - Keep the tone professional, wise, and encouraging.

Reply in ${language === 'tr' ? 'Turkish' : 'English'}.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json({ message: text });
    } catch (error) {
        console.error("Sudoku API Error:", error);
        return NextResponse.json({ message: "Error: Failed to process request with AI." }, { status: 500 });
    }
}
