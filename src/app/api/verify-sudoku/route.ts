import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { originalPuzzle, userGrid, date, language } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ message: "Error: API Key not configured." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

        const prompt = `You are a friendly, encouraging Sudoku master AI judge for Oznur's portfolio site.
The user is playing the daily Sudoku puzzle for ${date}.

Here is the original puzzle (where '-' means an empty space):
${originalPuzzle}

Here is the user's completed grid:
${userGrid}

First, check if the user's grid solves the Sudoku correctly. A valid Sudoku has the numbers 1-9 in every row, column, and 3x3 block, and must perfectly match the numbers given in the original puzzle.

If the solution is fully correct: Let them know they solved it perfectly and congratulate them!
If the solution is partially wrong: Let them know gently, point out roughly where the mistake is (e.g. "There is a duplicate number in the 3rd row" or "A 3x3 box has conflicting numbers"), and encourage them to keep trying.
If there are empty spaces: Let them know the puzzle is not finished yet.

Reply in ${language === 'tr' ? 'Turkish' : 'English'} as per the user's current site language. Keep it natural, geeky-friendly, and slightly encouraging! Give the final verdict clearly. Do not reveal the exact full solution!`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json({ message: text });
    } catch (error) {
        console.error("Sudoku API Error:", error);
        return NextResponse.json({ message: "Error: Failed to process request with AI." }, { status: 500 });
    }
}
