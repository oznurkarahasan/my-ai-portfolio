"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Loader2, ArrowRight } from "lucide-react";

interface BlogPost {
    slug: string;
    title: string;
    summary: string;
    date: string;
    link?: string;
}

export function Blog() {
    const { t, language } = useLanguage();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftFade(scrollLeft > 10);
            setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`/api/posts?language=${language}`);
                const data = await response.json();
                const fetchedPosts = data.posts || [];
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, [language]);

    useEffect(() => {
        if (!isLoading) {
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => window.removeEventListener('resize', checkScroll);
        }
    }, [isLoading, posts]);

    const handleScroll = () => {
        checkScroll();
    };

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
                        <BookOpen size={32} className="text-orange-500" />
                        {t.blog.title}
                    </motion.h2>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 size={32} className="animate-spin text-orange-500" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-stone-400">No blog posts available yet.</p>
                        </div>
                    ) : (
                        <div className="relative">
                            <div
                                ref={scrollRef}
                                onScroll={handleScroll}
                                className={`flex gap-6 overflow-x-auto pt-4 pb-8 custom-scrollbar transition-all duration-300 ${showLeftFade && showRightFade ? 'mask-both' :
                                    showLeftFade ? 'mask-left' :
                                        showRightFade ? 'mask-right' : ''
                                    }`}
                            >
                                {posts.map((post, index) => (
                                    <motion.a
                                        key={post.slug}
                                        href={post.link || `/blog/${post.slug}`}
                                        target={post.link ? "_blank" : undefined}
                                        rel={post.link ? "noopener noreferrer" : undefined}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] h-[480px] bg-stone-900/80 backdrop-blur-xl border border-stone-800/50 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 snap-start flex flex-col"
                                    >
                                        {/* Image Header */}
                                        <div className="relative h-48 w-full overflow-hidden bg-stone-800">
                                            {/* Default Background Gradient as Fallback */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-stone-900 group-hover:scale-110 transition-transform duration-700" />

                                            <Image
                                                src={`/posts/docs/${post.slug}.png`}
                                                alt={post.title}
                                                fill
                                                unoptimized
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />

                                            {/* Overlay Gradient for Text Readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
                                        </div>

                                        <div className="relative p-7 flex-1 flex flex-col z-10">
                                            {/* Content */}
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                                                {post.title}
                                            </h3>

                                            <p className="text-stone-400 text-sm leading-relaxed mb-6 line-clamp-4 font-medium">
                                                {post.summary}
                                            </p>

                                            {/* Footer */}
                                            <div className="mt-auto pt-5 border-t border-stone-800/50 flex items-center justify-between">
                                                <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.1em] flex items-center gap-2 group/link">
                                                    {t.blog.readMore}
                                                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                                </span>
                                                {post.link && (
                                                    <ExternalLink size={16} className="text-stone-600 group-hover:text-orange-400 transition-colors" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom Progress Accent */}
                                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:w-full transition-all duration-1000 origin-center" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

