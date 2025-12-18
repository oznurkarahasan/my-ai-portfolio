"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Loader2 } from "lucide-react";

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
                        <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
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
                                        className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] p-6 bg-stone-900 border border-stone-800 rounded-2xl hover:border-orange-500/50 transition-all hover:-translate-y-1 snap-start"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 bg-stone-800 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                                                <BookOpen size={24} className="text-orange-500" />
                                            </div>
                                            {post.link && (
                                                <ExternalLink size={20} className="text-stone-600 group-hover:text-orange-400 transition-colors" />
                                            )}
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
                    )}
                </div>
            </div>
        </section>
    );
}
