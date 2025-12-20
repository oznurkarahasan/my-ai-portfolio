"use client";

import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { useFilter } from "@/context/FilterContext";
import { GitHubStats } from "./GitHubStats";

export function About() {
    const { t } = useLanguage();
    const { selectedTech, setSelectedTech } = useFilter();

    const handleTechClick = (skill: string) => {
        // Extract base technology name if it has extra info in parentheses or after slashes
        // e.g., "Python (Django/FastAPI/LightGBM)" -> "Python"
        // e.g., "Generative AI / RAG / FAISS" -> "Generative AI"
        const baseTech = skill.split(/ \/ | \(|\)/)[0].trim();
        setSelectedTech(baseTech);

        // Scroll to projects section
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                                {portfolioData.skills.map((skill, index) => {
                                    const baseTech = skill.split(/ \/ | \(|\)/)[0].trim();
                                    const isActive = selectedTech === baseTech;

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleTechClick(skill)}
                                            className={`px-3 py-1 bg-stone-800 text-sm border border-stone-700 rounded-full transition-all hover:border-orange-500/50 ${isActive
                                                ? 'border-orange-500 text-orange-400 bg-stone-800/80 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
                                                : 'text-orange-200'
                                                }`}
                                        >
                                            {skill}
                                        </button>
                                    );
                                })}
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
