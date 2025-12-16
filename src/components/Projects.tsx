"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function Projects() {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-white mb-12 flex items-center gap-3"
                    >
                        <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
                        {t.projects.title}
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {t.projects.items.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all hover:-translate-y-1"
                            >
                                <div className="p-6 h-full flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-stone-400 text-sm leading-relaxed mb-4">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="text-xs text-stone-500 font-mono">
                                                    #{tech}
                                                </span>
                                            ))}
                                        </div>

                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-stone-200 font-medium hover:text-orange-400 transition-colors"
                                        >
                                            {t.projects.viewProject} <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
