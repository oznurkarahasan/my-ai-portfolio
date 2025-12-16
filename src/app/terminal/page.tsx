"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, ArrowLeft } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string;
}

export default function TerminalPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", content: "Initializing OznurOS v2.0..." },
    { type: "system", content: "Connecting to Neural Backend..." },
    { type: "system", content: "Connection Established." },
    { type: "output", content: "Welcome, Guest. I am Oznur's AI Assistant. Type 'help' for commands or just ask me anything." },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus input
    inputRef.current?.focus();
    // Scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmd: string) => {
    const command = cmd.trim();
    if (!command) return;

    // Add user input to history
    setHistory((prev) => [...prev, { type: "input", content: command }]);
    setIsProcessing(true);
    setInput("");

    // Special hardcoded commands
    if (command.toLowerCase() === "clear") {
        setHistory([]);
        setIsProcessing(false);
        return;
    }
    if (command.toLowerCase() === "home" || command.toLowerCase() === "exit") {
        setHistory((prev) => [...prev, { type: "system", content: "Terminating session..." }]);
        setTimeout(() => router.push("/"), 800);
        return;
    }
    if (command.toLowerCase() === "help") {
         setHistory((prev) => [...prev, { type: "output", content: "Available commands:\n- about: Learn about Oznur\n- projects: List projects\n- contact: Get contact info\n- clear: Clear terminal\n- exit: Return to GUI\n\nOr just chat naturally!" }]);
         setIsProcessing(false);
         return;
    }

    // Call AI API
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: command,
          // We only send recent conversation context to save tokens, or modify API to handle full string history if needed.
          // For now, sending simple history or just the current message is fine for a basic terminal effect, 
          // but let's try to map the last few lines if they are 'input'/'output'.
          history: history.filter(h => h.type !== 'system').slice(-6).map(h => ({
              role: h.type === 'input' ? 'user' : 'model',
              content: h.content
          }))
        }),
      });

      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      
      setHistory((prev) => [...prev, { type: "output", content: data.text }]);

    } catch (error) {
      console.error(error);
      setHistory((prev) => [...prev, { type: "system", content: "Error: Could not reach the mainframe." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-orange-500 font-mono p-4 md:p-10 selection:bg-orange-900 selection:text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-orange-900/50 pb-2">
        <div className="flex items-center gap-2">
            <TerminalIcon size={20} />
            <span className="text-sm uppercase tracking-widest opacity-80">oznur_terminal ~ guest@portfolio</span>
        </div>
        <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-xs hover:text-orange-300 transition-colors uppercase"
        >
            <ArrowLeft size={14} /> Exit
        </button>
      </div>

      {/* Terminal Viewport */}
      <div 
        className="flex-1 overflow-y-auto scrollbar-none"
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-2">
             {history.map((line, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`${line.type === 'system' ? 'text-orange-700 italic' : ''} ${line.type === 'input' ? 'font-bold' : ''} whitespace-pre-wrap`}
                >
                    <span className="mr-2 opacity-50 select-none">
                        {line.type === 'input' ? '>' : line.type === 'output' ? '#' : '*'}
                    </span>
                    {line.content}
                </motion.div>
             ))}
             {isProcessing && (
                 <div className="animate-pulse text-orange-700"># Processing data packet...</div>
             )}
        </div>

        {/* Input Line */}
        <div className="flex items-center mt-2 group">
            <span className="mr-2 text-orange-500 font-bold">{'>'}</span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleCommand(input);
                }}
                className="flex-1 bg-transparent border-none outline-none text-orange-500 font-mono caret-orange-500"
                autoComplete="off"
                autoFocus
            />
            <span className="w-2 h-5 bg-orange-500 animate-pulse ml-1" />
        </div>
      </div>
      
      {/* CRT Scanline Effect Overlay (Optional but cool) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] opacity-20"></div>
    </div>
  );
}
