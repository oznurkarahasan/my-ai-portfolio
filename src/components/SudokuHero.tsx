"use client";

import { useEffect, useState, useCallback } from "react";
import { getSudoku } from "sudoku-gen";
import {
    BrainCircuit,
    Loader2,
    Sparkles,
    RefreshCcw,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    Undo2,
    Sun
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

type SudokuGrid = string[][];

interface SudokuHeroProps {
    onBack: () => void;
}

export function SudokuHero({ onBack }: SudokuHeroProps) {
    const { t, language } = useLanguage();
    const [originalString, setOriginalString] = useState<string>("");
    const [solutionString, setSolutionString] = useState<string>("");
    const [grid, setGrid] = useState<SudokuGrid>([]);
    const [history, setHistory] = useState<SudokuGrid[]>([]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [tempUserGrid, setTempUserGrid] = useState<SudokuGrid | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

    const generateNewPuzzle = useCallback((todayDate: string, diff: "easy" | "medium" | "hard" = "medium") => {
        const puzzle = getSudoku(diff);
        const puzzleStr = puzzle.puzzle.replace(/0/g, "-");

        const newGrid: string[][] = [];
        for (let i = 0; i < 9; i++) {
            const row = puzzleStr.slice(i * 9, i * 9 + 9).split("");
            newGrid.push(row.map(char => (char === "-" ? "" : char)));
        }

        setOriginalString(puzzleStr);
        setSolutionString(puzzle.solution);
        setGrid(newGrid);
        setHistory([]);
        setAiResponse(null);
        setShowSolution(false);
        setTempUserGrid(null);

        localStorage.setItem("daily-sudoku", JSON.stringify({
            date: todayDate,
            original: puzzleStr,
            solution: puzzle.solution,
            userGrid: newGrid,
            difficulty: diff
        }));
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);

        const savedData = localStorage.getItem("daily-sudoku");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Ensure the solution is present in the saved data
                if (parsed.date === today && parsed.solution) {
                    setOriginalString(parsed.original);
                    setSolutionString(parsed.solution);
                    setGrid(parsed.userGrid);
                    setDifficulty(parsed.difficulty || "medium");
                    setHistory([]);
                    return;
                }
            } catch (e) {
                console.error("Storage error", e);
            }
        }
        generateNewPuzzle(today);
    }, [generateNewPuzzle]);

    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        if (!/^[1-9]?$/.test(value) || showSolution) return;

        // Save current state to history before changing
        setHistory(prev => [...prev, grid.map(row => [...row])]);

        const newGrid = [...grid.map(row => [...row])];
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);

        localStorage.setItem("daily-sudoku", JSON.stringify({
            date,
            original: originalString,
            solution: solutionString,
            userGrid: newGrid,
            difficulty
        }));
    };

    const handleUndo = () => {
        if (history.length === 0) return;

        const previousGrid = history[history.length - 1];
        setGrid(previousGrid);
        setHistory(prev => prev.slice(0, -1));

        localStorage.setItem("daily-sudoku", JSON.stringify({
            date,
            original: originalString,
            solution: solutionString,
            userGrid: previousGrid,
            difficulty
        }));
    };

    const handleReset = () => {
        const resetGrid: string[][] = [];
        for (let i = 0; i < 9; i++) {
            const row = originalString.slice(i * 9, i * 9 + 9).split("");
            resetGrid.push(row.map(char => (char === "-" ? "" : char)));
        }

        setGrid(resetGrid);
        setHistory([]);
        setAiResponse(null);
        setShowSolution(false);
        setTempUserGrid(null);

        localStorage.setItem("daily-sudoku", JSON.stringify({
            date,
            original: originalString,
            solution: solutionString,
            userGrid: resetGrid,
            difficulty
        }));
    };

    const handleVerify = async () => {
        setIsVerifying(true);
        setAiResponse(null);

        // Flatten grid for API
        const userStr = grid.map(row => row.map(v => v === "" ? "-" : v).join("")).join("");

        try {
            const res = await fetch("/api/verify-sudoku", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    originalPuzzle: originalString,
                    userGrid: userStr,
                    date,
                    language
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setAiResponse(data.message);
            }
        } catch (error) {
            setAiResponse(t.sudoku.error);
        } finally {
            setIsVerifying(false);
        }
    };

    const isGridFull = grid.every(row => row.every(cell => cell !== ""));

    const handleShowAnswer = () => {
        if (!solutionString) return;

        if (showSolution) {
            // Restore user grid
            if (tempUserGrid) {
                setGrid(tempUserGrid);
            }
            setShowSolution(false);
            setTempUserGrid(null);
        } else {
            // Save current grid and show solution
            setTempUserGrid(grid.map(row => [...row]));
            const solvedGrid: string[][] = [];
            for (let i = 0; i < 9; i++) {
                solvedGrid.push(solutionString.slice(i * 9, i * 9 + 9).split(""));
            }
            setGrid(solvedGrid);
            setShowSolution(true);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center pt-28 pb-20 relative px-4 sm:px-6">
            <div className="container mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl mx-auto"
                >


                    <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
                        {/* Sudoku Board Column */}
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="mb-8 text-center lg:text-left">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-4"
                                >
                                    <Sparkles size={12} />
                                    <span>{t.sudoku.challengeTitle}</span>
                                </motion.div>
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-none">
                                    {t.sudoku.title}
                                </h1>
                            </div>

                            <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start w-full">
                                {/* Board Container */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative group p-1 sm:p-1.5 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl shrink-0"
                                >
                                    <div className="grid grid-cols-9 gap-1 bg-stone-800/20 p-1 sm:p-1.5 rounded-2xl overflow-hidden shadow-inner">
                                        {grid.length > 0 && grid.map((row, rIndex) => (
                                            row.map((cellValue, cIndex) => {
                                                const isOriginal = originalString[rIndex * 9 + cIndex] !== "-";

                                                // 3x3 Block identification for thicker borders
                                                const isRightEdge = (cIndex + 1) % 3 === 0 && cIndex !== 8;
                                                const isBottomEdge = (rIndex + 1) % 3 === 0 && rIndex !== 8;

                                                return (
                                                    <div
                                                        key={`${rIndex}-${cIndex}`}
                                                        className={`
                                                            aspect-square w-8 sm:w-10 md:w-12 lg:w-14 flex items-center justify-center relative transition-all duration-300
                                                            ${isRightEdge ? "mr-2 sm:mr-3" : ""}
                                                            ${isBottomEdge ? "mb-2 sm:mb-3" : ""}
                                                        `}
                                                    >
                                                        {/* Input container remains here */}
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={1}
                                                            value={cellValue}
                                                            onChange={(e) => handleCellChange(rIndex, cIndex, e.target.value)}
                                                            readOnly={isOriginal}
                                                            className={`
                                                                w-full h-full text-center text-lg sm:text-2xl font-bold rounded-lg outline-none transition-all duration-200
                                                                ${isOriginal
                                                                    ? "bg-transparent text-slate-500 cursor-not-allowed font-black"
                                                                    : showSolution
                                                                        ? "bg-orange-500/10 text-white font-bold"
                                                                        : "bg-white/5 text-orange-400 hover:bg-orange-500/10 focus:bg-orange-500/20 focus:text-white caret-orange-500"
                                                                }
                                                                ${showSolution ? "cursor-not-allowed" : ""}
                                                            `}
                                                        />

                                                        {/* Centered Boundary Lines */}
                                                        {isRightEdge && (
                                                            <div className="absolute -right-[6px] sm:-right-[8px] top-0 w-px h-full bg-white/20 pointer-events-none" />
                                                        )}
                                                        {isBottomEdge && (
                                                            <div className="absolute -bottom-[6px] sm:-bottom-[8px] left-0 w-full h-px bg-white/20 pointer-events-none" />
                                                        )}

                                                        {isOriginal && (
                                                            <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-slate-600 opacity-30" />
                                                        )}
                                                    </div>
                                                );
                                            })
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Repositioned Utility Bar (Controls) */}
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl w-full max-w-[320px]">
                                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <RefreshCcw size={16} className="text-orange-500" />
                                        <span>{t.sudoku.controls}</span>
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={handleReset}
                                                className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex items-center justify-center gap-2 text-slate-300 text-sm font-medium"
                                            >
                                                <RefreshCcw size={14} />
                                                <span>{t.sudoku.resetBtn}</span>
                                            </button>
                                            <button
                                                onClick={handleUndo}
                                                disabled={history.length === 0}
                                                className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex items-center justify-center gap-2 text-slate-300 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <Undo2 size={14} />
                                                <span>{t.sudoku.undoBtn}</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleVerify}
                                            disabled={isVerifying}
                                            className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 transition-all flex items-center justify-center gap-2 text-white text-sm font-bold shadow-lg shadow-orange-600/20 disabled:opacity-50 group overflow-hidden relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            {isVerifying ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                                            <span className="relative z-10">{isVerifying ? t.sudoku.processing : t.sudoku.verifyBtn}</span>
                                        </button>
                                        <button
                                            onClick={handleShowAnswer}
                                            disabled={!isGridFull}
                                            className={`
                                                w-full py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-bold border
                                                ${!isGridFull
                                                    ? "bg-white/5 border-white/5 text-slate-500 opacity-30 cursor-not-allowed"
                                                    : showSolution
                                                        ? "bg-orange-500 border-orange-400 text-white shadow-lg"
                                                        : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 shadow-lg"
                                                }
                                            `}
                                        >
                                            <BrainCircuit size={16} />
                                            <span>
                                                {showSolution
                                                    ? (t.sudoku.hideAnswer || (language === 'tr' ? 'Cevabı Gizle' : 'Hide Answer'))
                                                    : (t.sudoku.showAnswer || (language === 'tr' ? 'Cevabı Göster' : 'Show Answer'))
                                                }
                                            </span>
                                        </button>
                                    </div>
                                    <div className="mt-6">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2">{t.sudoku.levelSelection}</p>
                                        <div className="flex flex-col gap-2">
                                            {(['easy', 'medium', 'hard'] as const).map((lv) => (
                                                <button
                                                    key={lv}
                                                    onClick={() => {
                                                        setDifficulty(lv);
                                                        generateNewPuzzle(date, lv);
                                                    }}
                                                    className={`
                                                        w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all
                                                        ${difficulty === lv
                                                            ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20"
                                                            : "bg-white/5 border-white/5 text-slate-500 hover:text-slate-300"
                                                        }
                                                    `}
                                                >
                                                    {lv === 'easy' ? t.sudoku.easy : lv === 'medium' ? t.sudoku.medium : t.sudoku.hard}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Column */}
                        <div className="flex flex-col gap-8 w-full lg:pt-32">

                            {/* AI Verdict Box */}
                            <AnimatePresence>
                                {aiResponse ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="relative"
                                    >
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-rose-600 rounded-3xl blur opacity-20" />
                                        <div className="relative p-8 rounded-3xl bg-stone-900/90 border border-white/10 backdrop-blur-3xl overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Sun size={64} className="rotate-12" />
                                            </div>

                                            <div className="flex items-center gap-3 text-white font-black mb-4 uppercase tracking-tighter text-xl">
                                                <div className="p-1.5 rounded-lg bg-orange-500">
                                                    <Sun size={18} className="text-white animate-spin-slow" />
                                                </div>
                                                <span>{t.sudoku.aiTitle}</span>
                                            </div>

                                            <div className="text-slate-200 leading-relaxed text-sm font-medium space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                                {aiResponse}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-full min-h-[160px] flex flex-col items-center justify-center p-8 rounded-3xl border border-dashed border-white/10 opacity-30">
                                        <AlertCircle size={32} className="mb-3 text-slate-500" />
                                        <p className="text-xs text-center font-medium uppercase tracking-[0.2em] opacity-60">{t.sudoku.aiWaiting}</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
