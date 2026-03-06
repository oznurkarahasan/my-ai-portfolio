"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Github, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const GitHubCalendar = dynamic(
    () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
    { ssr: false }
);
import { portfolioData } from "@/data/portfolioData";

export function GitHubStats() {
    const { language } = useLanguage();
    const [isMobile, setIsMobile] = useState(false);
    const username = portfolioData.personal.githubStats.username;
    const githubUrl = portfolioData.personal.social.github;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const t = {
        tr: {
            title: "GitHub Katkıları",
            subtitle: "Açık kaynak dünyasındaki dijital izlerim",
            viewProfile: "Profili Görüntüle",
            disclaimer: "* Son 1 yıl içindeki geliştirme aktivitelerini yansıtmaktadır."
        },
        en: {
            title: "GitHub Contributions",
            subtitle: "My digital footprints in open source",
            viewProfile: "View Profile",
            disclaimer: "* Reflects contribution activity from the past year."
        }
    }[language as 'tr' | 'en'] || {
        tr: { title: "GitHub Katkıları", subtitle: "Dijital izlerim", viewProfile: "Profil", disclaimer: "* Son 1 yılın verileri." },
        en: { title: "GitHub Contributions", subtitle: "Digital footprints", viewProfile: "Profile", disclaimer: "* Past year data." }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-20 mb-12"
        >
            {/* Header Section with Integrated Link */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="text-center md:text-left">
                    <motion.h3
                        variants={itemVariants}
                        className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-3"
                    >
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Github className="w-8 h-8 text-orange-500" />
                        </div>
                        {t.title}
                    </motion.h3>
                    <motion.p variants={itemVariants} className="mt-2 text-stone-400 max-w-2xl">
                        {t.subtitle}
                    </motion.p>
                </div>

                <motion.a
                    variants={itemVariants}
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white border border-orange-500/20 hover:border-orange-500 rounded-2xl transition-all duration-300 font-bold group shadow-lg shadow-orange-500/5 hover:shadow-orange-500/20"
                >
                    {t.viewProfile}
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
            </div>

            {/* Calendar Card - Focused and Responsive */}
            <motion.div
                variants={itemVariants}
                className="relative group"
            >
                {/* Subtle Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/5 to-transparent rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>

                <div className="relative bg-stone-900/40 backdrop-blur-md border border-stone-800 rounded-3xl p-6 md:p-10 shadow-2xl">

                    {/* Header Info */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse ring-4 ring-orange-500/20"></div>
                            <span className="text-sm font-semibold text-stone-300 tracking-wide uppercase">Activity Graph</span>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-stone-500 uppercase font-bold tracking-tighter mr-1">Less</span>
                            {[0, 0.25, 0.5, 0.75, 1].map((lvl, i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 rounded-xs transition-transform hover:scale-125 duration-200"
                                    style={{
                                        backgroundColor: i === 0 ? '#1c1917' : '#ea580c',
                                        opacity: i === 0 ? 1 : i * 0.25,
                                        border: i === 0 ? '1px solid #292524' : 'none'
                                    }}
                                ></div>
                            ))}
                            <span className="text-[10px] text-stone-500 uppercase font-bold tracking-tighter ml-1">More</span>
                        </div>
                    </div>

                    {/* Highly Responsive Container */}
                    <div className="w-full">
                        <div className="overflow-x-auto pb-4 custom-scrollbar mask-both md:mask-none scroll-smooth">
                            <div className="min-w-max px-2 md:px-0 flex justify-center">
                                <GitHubCalendar
                                    username={username}
                                    renderColorLegend={() => <g />}
                                    labels={{
                                        legend: {
                                            less: '',
                                            more: ''
                                        }
                                    }}
                                    blockSize={isMobile ? 11 : 14}
                                    blockMargin={5}
                                    fontSize={13}
                                    theme={{
                                        light: ['#1c1917', '#ea580c'],
                                        dark: ['#1c1917', '#452109', '#7c3a0a', '#ea580c', '#f97316'],
                                    }}
                                    renderBlock={(block, activity) => {
                                        // Filter out potential conflicts with Framer Motion props
                                        const { onAnimationStart, onDragStart, onDragEnd, onDrag, ...safeProps } = block.props as any;
                                        return (
                                            <motion.rect
                                                {...safeProps}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                whileHover={{ scale: 1.2, stroke: '#f97316', strokeWidth: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 20,
                                                    delay: Math.random() * 0.8 // Dynamic staggered entrance
                                                }}
                                            />
                                        );
                                    }}
                                    style={{
                                        color: '#78716c',
                                        margin: '0 auto',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Labeling */}
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-stone-800/50 pt-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-stone-800/40 rounded-full border border-stone-800">
                            <span className="text-xs text-stone-500 font-medium tracking-wide">Connected as:</span>
                            <span className="text-xs text-orange-400 font-bold">{username}</span>
                        </div>
                        <p className="text-xs text-stone-600 italic">
                            {t.disclaimer}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
