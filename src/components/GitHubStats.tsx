"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function GitHubStats() {
    const { t, language } = useLanguage();

    const title = language === 'tr' ? 'GitHub Katkıları' : 'GitHub Contributions';

    return (
        <div className="mt-16">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
                {title}
            </h3>
            <div className="bg-stone-800/50 border border-stone-800 rounded-2xl p-6 overflow-hidden">
                <div className="flex justify-center overflow-x-auto custom-scrollbar pt-2">
                    <GitHubCalendar
                        username="oznurkarahasan"
                        blockSize={12}
                        blockMargin={4}
                        fontSize={14}
                        theme={{
                            light: ['#1c1917', '#ea580c'],
                            dark: ['#1c1917', '#44403c', '#78716c', '#d6d3d1', '#f97316'],
                        }}
                        style={{
                            color: '#d6d3d1',
                        }}
                    />
                </div>
            </div>
            <p className="mt-4 text-sm text-stone-500 text-center italic">
                {language === 'tr' ? '* Son 1 yıl içindeki açık kaynak katkıları.' : '* Open source contributions in the last year.'}
            </p>
        </div>
    );
}
