"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, MessageSquare, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
    role: "user" | "model";
    content: string;
}

export function ChatBot() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    // Initialize ONLY once on mount if empty, but we must be careful with language switching
    // If language changes, we might want to reset or keep history? 
    // For simplicity, let's append the welcome message when opening if empty.
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ role: "model", content: t.chatbot.initialMessage }]);
        }
    }, [t.chatbot.initialMessage, messages.length]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || errorData.error || "Network response was not ok");
            }

            const data = await response.json();
            setMessages((prev) => [...prev, { role: "model", content: data.text }]);
        } catch (error: any) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "model", content: `Error: ${error.message || "Something went wrong."}` },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 p-4 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-colors shadow-orange-900/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-full max-w-[350px] sm:max-w-[400px] h-[500px] bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="p-4 bg-stone-800 border-b border-stone-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Portfolio Bot</h3>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === "user"
                                            ? "bg-orange-600 text-white rounded-tr-none"
                                            : "bg-stone-800 text-stone-200 rounded-tl-none border border-stone-700"
                                            }`}
                                    >
                                        {msg.role === "model" ? (
                                            <div className="prose prose-invert prose-sm max-w-none">
                                                <ReactMarkdown
                                                    components={{
                                                        a: ({ node, ...props }) => <a {...props} className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                                        p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-stone-800 rounded-2xl p-3 px-4 rounded-tl-none border border-stone-700 flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-orange-400" />
                                        <span className="text-xs text-stone-400">{t.chatbot.thinking}</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-4 bg-stone-800 border-t border-stone-700"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t.chatbot.placeholder}
                                    className="w-full bg-stone-950 text-white border border-stone-700 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-stone-500 text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
