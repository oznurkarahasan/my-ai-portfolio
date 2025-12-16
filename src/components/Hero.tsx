"use client";

import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import CreativeBackground from "./CreativeBackground";

export function Hero() {
    const { t } = useLanguage();
    const { name, social } = portfolioData.personal;

    return (
        <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
            {/* Background Elements */}
            <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -z-10"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
            <CreativeBackground />

            <div className="container mx-auto px-6 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-orange-500 font-medium tracking-wide uppercase mb-4">
                            {t.hero.greeting}
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            {name}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
                            {t.hero.title}
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-900/20"
                        >
                            {t.hero.cta} <ArrowRight size={18} />
                        </a>
                        <div className="flex items-center gap-4 px-6 border-l border-slate-800 ml-4 pl-8">
                            <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <Github size={24} />
                            </a>
                            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <Linkedin size={24} />
                            </a>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
