import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useFilter } from "@/context/FilterContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Code2, Zap } from "lucide-react";

export function Projects() {
    const { t } = useLanguage();
    const { selectedTech, setSelectedTech } = useFilter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);

    const filteredProjects = selectedTech
        ? t.projects.items.filter((project: any) =>
            project.techStack.some((tech: string) =>
                tech.toLowerCase().includes(selectedTech.toLowerCase())
            )
        )
        : t.projects.items;

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftFade(scrollLeft > 10);
            setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [filteredProjects]);

    const handleScroll = () => {
        checkScroll();
    };

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white flex items-center gap-3"
                        >
                            <Zap size={32} className="text-orange-500 fill-orange-500/20" />
                            {t.projects.title}
                        </motion.h2>

                        <AnimatePresence>
                            {selectedTech && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full"
                                >
                                    <span className="text-sm text-orange-400">
                                        Showing: <span className="font-semibold">{selectedTech}</span>
                                    </span>
                                    <button
                                        onClick={() => setSelectedTech(null)}
                                        className="text-orange-400 hover:text-white transition-colors"
                                        title="Clear filter"
                                    >
                                        <X size={16} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="relative">
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className={`flex gap-6 overflow-x-auto pt-4 pb-8 custom-scrollbar transition-all duration-300 ${showLeftFade && showRightFade ? 'mask-both' :
                                showLeftFade ? 'mask-left' :
                                    showRightFade ? 'mask-right' : ''
                                }`}
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] h-[480px] bg-stone-900/80 backdrop-blur-xl border border-stone-800/50 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 snap-start flex flex-col"
                                    >
                                        {/* Card Glow Effect */}
                                        <div className="absolute -inset-2 px-6 py-6 bg-orange-500/0 group-hover:bg-orange-500/5 blur-3xl transition-all duration-700 pointer-events-none" />

                                        {/* Decorative Grid Pattern */}
                                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                                            <Code2 size={120} strokeWidth={1} className="rotate-12" />
                                        </div>

                                        <div className="relative p-8 h-full flex flex-col z-10">
                                            {/* Top Section */}
                                            <div className="mb-6">
                                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors leading-tight">
                                                    {project.title}
                                                </h3>
                                                <p className="text-stone-400 text-sm leading-relaxed mb-6 font-medium">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto">
                                                {/* Tech Stack - Glass Chips */}
                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {project.techStack.map((tech, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setSelectedTech(tech)}
                                                            className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 border ${selectedTech === tech
                                                                ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20'
                                                                : 'bg-stone-800/50 text-stone-400 border-stone-700/50 hover:border-orange-500/50 hover:text-orange-400'
                                                                }`}
                                                        >
                                                            {tech}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* CTA Link */}
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-orange-500 text-white border border-white/10 hover:border-orange-500 rounded-xl text-sm font-bold transition-all duration-300 group/btn"
                                                >
                                                    {t.projects.viewProject}
                                                    <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Bottom Accent line */}
                                        < div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 group-hover:w-full transition-all duration-700" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
