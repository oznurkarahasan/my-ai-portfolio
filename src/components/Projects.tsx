import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useFilter } from "@/context/FilterContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

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
                            <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
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
                                        className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all hover:-translate-y-1 snap-start"
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
                                                        <button
                                                            key={i}
                                                            onClick={() => setSelectedTech(tech)}
                                                            className={`text-xs font-mono transition-colors hover:text-orange-400 ${selectedTech === tech ? 'text-orange-500' : 'text-stone-500'
                                                                }`}
                                                        >
                                                            #{tech}
                                                        </button>
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
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
