"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";

export function Blog() {
    const { t } = useLanguage();

    return (
        <section id="blog" className="py-20 bg-stone-900/30">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-white mb-12 flex items-center gap-3"
                    >
                        <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
                        {t.blog.title}
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {t.blog.items.map((post, index) => (
                            <motion.a
                                key={index}
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group block p-6 bg-stone-900 border border-stone-800 rounded-2xl hover:border-orange-500/50 transition-all hover:-translate-y-1 h-full"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-stone-800 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                                        <BookOpen size={24} className="text-orange-500" />
                                    </div>
                                    <ExternalLink size={20} className="text-stone-600 group-hover:text-orange-400 transition-colors" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-stone-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.summary}
                                </p>

                                <div className="mt-auto pt-4 border-t border-stone-800">
                                    <span className="text-xs font-medium text-orange-500 uppercase tracking-wider group-hover:underline">
                                        {t.blog.readMore}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
