"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sun } from "lucide-react";

export function Navbar() {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showTerminalPreview, setShowTerminalPreview] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Show preview on mount, hide after 5 seconds
        const timer = setTimeout(() => {
            setShowTerminalPreview(false);
        }, 7000);

        // Initial delay to show animation smoothly after load
        const showTimer = setTimeout(() => {
            setShowTerminalPreview(true);
        }, 1000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
            clearTimeout(showTimer);
        };
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'tr' : 'en');
    };

    const navLinks = [
        { name: language === 'en' ? 'About' : 'Hakkımda', href: '#about' },
        { name: language === 'en' ? 'Projects' : 'Projeler', href: '#projects' },
        { name: 'Blog', href: '#blog' },
        { name: language === 'en' ? 'Contact' : 'İletişim', href: '#contact' },
        { name: 'TERMINAL', href: '/terminal' },
    ];

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md border-b border-orange-500/10 py-4" : "bg-transparent py-6"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tighter group">
                    <Sun className="w-8 h-8 text-orange-500 transition-transform duration-500 group-hover:rotate-180" />
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group/nav-item">
                            <a
                                href={link.href}
                                className={`font-medium transition-all duration-300 text-sm uppercase tracking-wider block ${link.name === 'TERMINAL'
                                    ? 'text-orange-500 font-bold font-mono border border-orange-500 bg-orange-500/10 px-4 py-2 rounded shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:bg-orange-500 hover:text-black hover:scale-105 active:scale-95'
                                    : 'text-slate-300 hover:text-orange-500'
                                    }`}
                            >
                                {link.name === 'TERMINAL' ? <span className="flex items-center gap-1"><span className="animate-pulse">{'>_'}</span> TERMINAL</span> : link.name}
                            </a>

                            {/* Terminal Preview Tooltip */}
                            {link.name === 'TERMINAL' && (
                                <AnimatePresence>
                                    {showTerminalPreview && (
                                        <motion.div
                                            onClick={() => router.push('/terminal')}
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-black border border-orange-500/30 rounded-lg shadow-2xl overflow-hidden z-50 cursor-pointer hover:border-orange-500/60 transition-colors"
                                        >
                                            {/* Terminal Header */}
                                            <div className="bg-orange-500/10 border-b border-orange-500/20 px-3 py-1.5 flex items-center justify-between">
                                                <div className="flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                                </div>
                                                <div className="text-[10px] text-orange-500/70 font-mono">bash</div>
                                            </div>

                                            {/* Terminal Content */}
                                            <div className="p-3 font-mono text-xs text-orange-500/80 leading-relaxed">
                                                <div className="flex gap-2">
                                                    <span className="text-green-500">$</span>
                                                    <span>init_portfolio_ai</span>
                                                </div>
                                                <div className="text-orange-300/60 my-1">Loading modules...</div>
                                                <div className="flex gap-2">
                                                    <span className="text-green-500">$</span>
                                                    <span>click_to_enter_terminal</span>
                                                </div>
                                                <div className="mt-2 text-white/90 border-l-2 border-orange-500 pl-2">
                                                    "I can help you to explore..."
                                                </div>
                                            </div>

                                            {/* Connecting Triangle */}
                                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-t border-l border-orange-500/30 rotate-45 transform"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-orange-500/50 transition-all text-sm text-slate-300 hover:text-orange-400"
                    >
                        <Globe size={16} />
                        <span className="font-mono uppercase">{language}</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Terminal Preview */}
            <div className="md:hidden">
                <AnimatePresence>
                    {showTerminalPreview && !isMobileMenuOpen && (
                        <motion.div
                            onClick={() => router.push('/terminal')}
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px] bg-black border border-orange-500/30 rounded-lg shadow-2xl overflow-hidden z-50 cursor-pointer"
                        >
                            {/* Terminal Header */}
                            <div className="bg-orange-500/10 border-b border-orange-500/20 px-3 py-1.5 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="text-[10px] text-orange-500/70 font-mono text-center flex-1">TERMINAL PREVIEW</div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-3 font-mono text-[10px] text-orange-500/80 leading-relaxed">
                                <div className="flex gap-2">
                                    <span className="text-green-500">$</span>
                                    <span>mobile_access_init</span>
                                </div>
                                <div className="mt-1 text-white/90 border-l-2 border-orange-500 pl-2">
                                    "Tap to enter the terminal..."
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-slate-800 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`py-2 px-4 rounded-md transition-all duration-300 font-medium block ${link.name === 'TERMINAL'
                                        ? 'text-orange-500 font-bold font-mono border border-orange-500/50 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)] animate-pulse'
                                        : 'text-slate-300 hover:text-orange-500'
                                        }`}
                                >
                                    {link.name === 'TERMINAL' ? (
                                        <span className="flex items-center gap-2">
                                            <span>{'>_'}</span>
                                            {link.name}
                                        </span>
                                    ) : link.name}
                                </a>
                            ))}
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-slate-300 hover:text-orange-500 mobile-lang-toggle py-2"
                            >
                                <Globe size={18} />
                                Switch to {language === 'en' ? 'Turkish' : 'English'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
