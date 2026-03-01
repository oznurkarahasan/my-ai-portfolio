"use client";

import { useEffect, useState } from "react";
import { getSudoku } from "sudoku-gen";
import { BrainCircuit, Loader2, Sparkles, RefreshCcw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";

type SudokuGrid = string[][]; // 9x9 grid of "1".."9" or ""

function stringToGrid(str: string): SudokuGrid {
    const grid: string[][] = [];
    for (let i = 0; i < 9; i++) {
        const row = str.slice(i * 9, i * 9 + 9).split("");
        grid.push(row.map(char => (char === "-" || char === "0" ? "" : char)));
    }
    return grid;
}

function gridToString(grid: SudokuGrid): string {
    return grid.map(row => row.map(v => v === "" ? "-" : v).join("")).join("");
}

export default function PuzzlePage() {
    const [originalString, setOriginalString] = useState<string>("");
    const [grid, setGrid] = useState<SudokuGrid>([]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        // Daily Sudoku Logic
        const today = new Date().toISOString().split("T")[0];
        setDate(today);

        const savedData = localStorage.getItem("daily-sudoku");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed.date === today) {
                    setOriginalString(parsed.original);
                    setGrid(parsed.userGrid);
                    return;
                }
            } catch (e) {
                console.error("Failed to parse saved sudoku data", e);
            }
        }

        generateNewPuzzle(today);
    }, []);

    const generateNewPuzzle = (todayDate: string) => {
        const puzzle = getSudoku("medium"); // "easy", "medium", "hard", "expert"
        const puzzleStr = puzzle.puzzle.replace(/0/g, "-");
        setOriginalString(puzzleStr);
        setGrid(stringToGrid(puzzleStr));
        setAiResponse(null);

        localStorage.setItem(
            "daily-sudoku",
            JSON.stringify({
                date: todayDate,
                original: puzzleStr,
                userGrid: stringToGrid(puzzleStr),
            })
        );
    };

    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        if (!/^[1-9]?$/.test(value)) return;

        const newGrid = [...grid];
        newGrid[rowIndex] = [...newGrid[rowIndex]];
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);

        localStorage.setItem(
            "daily-sudoku",
            JSON.stringify({
                date,
                original: originalString,
                userGrid: newGrid,
            })
        );
    };

    const handleVerify = async () => {
        setIsVerifying(true);
        setAiResponse(null);
        try {
            const res = await fetch("/api/verify-sudoku", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    originalPuzzle: originalString,
                    userGrid: gridToString(grid),
                    date,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setAiResponse(data.message);
            } else {
                setAiResponse("Hata: Yapay zeka ile ietişim kurulamadı.");
            }
        } catch (error) {
            setAiResponse("Hata: İstek gönderilirken bir sorun oluştu.");
        } finally {
            setIsVerifying(false);
        }
    };

    if (grid.length === 0) return (
        <LanguageProvider>
            <main className="min-h-screen text-slate-200 selection:bg-orange-500/30 flex flex-col pt-20">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                </div>
                <footer className="py-8 text-center text-stone-500 text-sm border-t border-stone-900 bg-stone-950 mt-auto">
                    <p>© {new Date().getFullYear()} My AI Portfolio - <i>designed and developed by</i> <i className="text-orange-500">Öznur Karahasan</i></p>
                </footer>
            </main>
        </LanguageProvider>
    );

    return (
        <LanguageProvider>
            <main className="min-h-screen text-slate-200 selection:bg-orange-500/30 flex flex-col">
                <Navbar />

                <div className="flex-1 pt-32 pb-12 px-4 w-full flex flex-col items-center">
                    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="inline-flex items-center justify-center p-3 bg-stone-900 rounded-2xl mb-4 border border-stone-800 shadow-xl">
                                <BrainCircuit className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-3 text-stone-100">
                                Günlük AI Bulmaca
                            </h1>
                            <p className="text-sm md:text-base text-stone-400">
                                SUDOKU çöz, AI ile doğrula. Geliştirdiğin hamleleri test et.
                            </p>
                            <p className="text-xs text-stone-500 mt-2 font-mono">Tarih: {date}</p>
                        </div>

                        {/* SUDOKU BOARD */}
                        <div className="bg-stone-900 p-1 sm:p-2 rounded-xl border border-stone-800 shadow-2xl mb-8 w-full max-w-[340px] sm:max-w-[440px] aspect-square mx-auto">
                            <div className="grid grid-cols-9 gap-[1px] bg-stone-700 h-full w-full rounded-lg overflow-hidden border border-stone-700">
                                {grid.map((row, rIndex) => (
                                    row.map((cellValue, cIndex) => {
                                        const isOriginal = originalString[rIndex * 9 + cIndex] !== "-";

                                        // Thicker borders for 3x3 grid boxes
                                        const borderClasses = `
                                            ${cIndex % 3 === 2 && cIndex !== 8 ? "border-r-2 sm:border-r-[3px] border-stone-900" : ""}
                                            ${rIndex % 3 === 2 && rIndex !== 8 ? "border-b-2 sm:border-b-[3px] border-stone-900" : ""}
                                        `.trim();

                                        return (
                                            <div key={`${rIndex}-${cIndex}`} className={`flex items-center justify-center bg-stone-900 ${borderClasses}`}>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={cellValue}
                                                    onChange={(e) => handleCellChange(rIndex, cIndex, e.target.value)}
                                                    readOnly={isOriginal}
                                                    className={`
                                                        w-full h-full text-center text-lg sm:text-2xl md:text-3xl font-semibold transition-colors duration-200 outline-none
                                                        ${isOriginal
                                                            ? "bg-transparent text-stone-400 cursor-not-allowed font-bold"
                                                            : "bg-stone-800 text-orange-400 hover:bg-stone-750 focus:bg-stone-700 cursor-text"
                                                        }
                                                    `}
                                                />
                                            </div>
                                        );
                                    })
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 sm:gap-4 mb-10 w-[90%] sm:w-auto max-w-[340px] mx-auto sm:max-w-none">
                            <button
                                onClick={() => generateNewPuzzle(date)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white transition-all font-medium border border-stone-700 active:scale-95 text-sm sm:text-base"
                                title="Baştan Başla / Yeni Bulmaca"
                            >
                                <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Sıfırla</span>
                            </button>

                            <button
                                onClick={handleVerify}
                                disabled={isVerifying}
                                className="flex-[2] sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-gradient-to-r from-orange-600 to-rose-600 text-white hover:opacity-90 transition-all font-medium shadow-lg hover:shadow-orange-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {isVerifying ? (
                                    <>
                                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                        <span>Bekleyin...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Doğrula</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* AI RESPONSE AREA */}
                        {aiResponse && (
                            <div className="w-[95%] sm:w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
                                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-rose-500" />
                                    <h3 className="flex items-center gap-2 text-stone-200 font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                                        <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                        AI Değerlendirmesi
                                    </h3>
                                    <div className="text-sm sm:text-base text-stone-300 leading-relaxed space-y-3 whitespace-pre-wrap">
                                        {aiResponse}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <footer className="py-8 text-center text-stone-500 text-sm border-t border-stone-900 bg-stone-950 mt-auto">
                    <p>© {new Date().getFullYear()} My AI Portfolio - <i>designed and developed by</i> <i className="text-orange-500">Öznur Karahasan</i></p>
                </footer>
            </main>
        </LanguageProvider>
    );
}
