"use client";

import { useLanguage } from "@/context/LanguageContext";
import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";

export function Contact() {
    const { t } = useLanguage();
    const { email, social } = portfolioData.personal;

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto text-center"
                >
                    <div className="inline-flex items-center justify-center p-4 bg-orange-600/10 rounded-full mb-8">
                        <Mail size={32} className="text-orange-500" />
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-6">
                        {t.contact.title}
                    </h2>

                    <p className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto">
                        {t.contact.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <a
                            href={`mailto:${email}`}
                            className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-900/20 flex items-center gap-3"
                        >
                            <Mail size={20} />
                            {t.contact.email}
                        </a>

                        <div className="flex items-center gap-4 bg-stone-900 border border-stone-800 rounded-full px-8 py-4">
                            <span className="text-stone-400 font-medium mr-2">{t.contact.social}:</span>
                            <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
                                <Github size={20} />
                            </a>
                            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href={social.medium} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
