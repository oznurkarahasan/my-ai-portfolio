"use client";

import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { FilterProvider } from "@/context/FilterContext";
import { SudokuHero } from "@/components/SudokuHero";
import { useRouter } from "next/navigation";
import { ChatBot } from "@/components/ChatBot";
import { motion } from "framer-motion";
import CreativeBackground from "@/components/CreativeBackground";

export default function PuzzlePage() {
    const router = useRouter();

    return (
        <LanguageProvider>
            <FilterProvider>
                <main className="min-h-screen text-slate-200 selection:bg-orange-500/30 bg-[#0c0a09] relative overflow-hidden">
                    <Navbar />

                    {/* Global Aesthetic Background mirroring the main site but for this dedicated page */}
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <motion.div
                            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.4, 0.3]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px]"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2]
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2
                            }}
                        />
                        <CreativeBackground />
                    </div>

                    <div className="relative z-10 w-full">
                        {/* We reuse the SudokuHero component */}
                        <SudokuHero onBack={() => router.push("/")} />
                    </div>

                    <ChatBot />

                    <footer className="relative z-10 py-12 text-center text-stone-500 text-sm border-t border-stone-900 bg-stone-950/50 backdrop-blur-md">
                        <p>© {new Date().getFullYear()} My AI Portfolio - <i>designed and developed by</i> <i className="text-orange-500">Öznur Karahasan</i></p>
                    </footer>
                </main>
            </FilterProvider>
        </LanguageProvider>
    );
}
