"use client";

import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { GitHubStats } from "./GitHubStats";

export function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-20 bg-stone-900/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
                        {t.about.title}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <p className="text-stone-300 text-lg leading-relaxed mb-6">
                                {t.about.bio}
                            </p>
                            <p className="text-stone-400 leading-relaxed">
                                {t.about.subBio}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">{t.about.techTitle}</h3>
                            <div className="flex flex-wrap gap-2">
                                {portfolioData.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-stone-800 text-orange-200 border border-stone-700 rounded-full text-sm hover:border-orange-500/50 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* GitHub Stats Integration */}
                    <GitHubStats />
                </motion.div>
            </div>
        </section>
    );
}
