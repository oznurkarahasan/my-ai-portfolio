"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon, ArrowLeft } from "lucide-react";
import { fileSystem, neofetchArt, FileSystemNode } from "@/lib/terminal-data";

interface TerminalLineData {
  type: "input" | "output" | "system";
  content: string;
  id: number;
}

// Sub-component for individual lines to handle typewriter effect
const TerminalLine = ({ line, isLast }: { line: TerminalLineData; isLast: boolean }) => {
  const [displayContent, setDisplayContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Only type out if it's an output/system message and it's the specific line being added
    if ((line.type === "output" || line.type === "system") && !displayContent && isLast) {
      setIsTyping(true);
      let i = 0;
      const timer = setInterval(() => {
        setDisplayContent(line.content.slice(0, i + 1));
        i++;
        if (i > line.content.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 5); // Faster typing speed
      return () => clearInterval(timer);
    } else {
      setDisplayContent(line.content);
    }
  }, [line, isLast]);

  // Helper to parse links in content
  const renderContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`${line.type === 'system' ? 'text-orange-700 italic' : ''} ${line.type === 'input' ? 'font-bold' : ''} whitespace-pre-wrap break-words`}
    >
      <span className="mr-2 opacity-50 select-none">
        {line.type === 'input' ? '>' : line.type === 'output' ? '#' : '*'}
      </span>
      {/* We render the processed content only if not currently typing, or if typing is done. 
          For simplicity during typing, we show raw text to avoid jagged link rendering, 
          or we can try to render it. Let's render raw during typing to ensure stability. */}
      {isTyping ? displayContent : renderContent(displayContent || line.content)}
      {isTyping && <span className="animate-pulse">_</span>}
    </div>
  );
};

export default function TerminalPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [history, setHistory] = useState<TerminalLineData[]>([
    { type: "system", content: "Initializing OznurOS v2.0...", id: 1 },
    { type: "system", content: "Connecting to Neural Backend...", id: 2 },
    { type: "system", content: "Connection Established.", id: 3 },
    { type: "output", content: "Welcome, Guest. Type 'help' for commands.", id: 4 },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Command History State
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1); // -1 means new line (not looking at history)

  // Tab Completion State
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [originalInput, setOriginalInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isProcessing]);

  const handleContainerClick = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      inputRef.current?.focus();
    }
  };

  const getDir = (path: string[]): FileSystemNode[] => {
    let current: FileSystemNode[] | undefined = fileSystem;
    for (const segment of path) {
      const found: FileSystemNode | undefined = current?.find((node: FileSystemNode) => node.name === segment && node.type === 'directory');
      if (found && found.children) {
        current = found.children;
      } else {
        return [];
      }
    }
    return current || [];
  };

  const getPromptPath = () => {
    if (currentPath.length === 0) return "~";
    return "~/" + currentPath.join("/");
  };

  const handleTabCompletion = () => {
    if (tabMatches.length > 0) {
      const nextIndex = (tabIndex + 1) % tabMatches.length;
      setTabIndex(nextIndex);

      const parts = originalInput.split(" ");
      if (parts.length === 1) {
        setInput(tabMatches[nextIndex]);
      } else {
        setInput(`${parts[0]} ${tabMatches[nextIndex]}`);
      }
      return;
    }

    const parts = input.split(" ");
    const currentInput = parts[parts.length - 1];
    let matches: string[] = [];

    if (parts.length === 1) {
      // Complete command
      const commands = ["help", "ls", "cd", "cat", "whoami", "neofetch", "clear", "home", "exit"];
      matches = commands.filter((c) => c.startsWith(currentInput.toLowerCase()));
    } else {
      // Complete file/dir
      const command = parts[0].toLowerCase();
      const prefix = parts.slice(1).join(" ");
      const contents = getDir(currentPath);

      if (command === "cd") {
        matches = contents
          .filter((n) => n.type === "directory" && n.name.toLowerCase().startsWith(prefix.toLowerCase()))
          .map((n) => n.name);
      } else if (command === "cat") {
        matches = contents
          .filter((n) => n.type === "file" && n.name.toLowerCase().startsWith(prefix.toLowerCase()))
          .map((n) => n.name);
      } else {
        matches = contents
          .filter((n) => n.name.toLowerCase().startsWith(prefix.toLowerCase()))
          .map((n) => n.name);
      }
    }

    if (matches.length > 0) {
      setTabMatches(matches);
      setTabIndex(0);
      setOriginalInput(input);

      if (parts.length === 1) {
        setInput(matches[0]);
      } else {
        setInput(`${parts[0]} ${matches[0]}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setTabMatches([]);
      setTabIndex(0);
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setTabMatches([]);
      setTabIndex(0);
      if (commandHistory.length === 0) return;

      const newPointer = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);

      setHistoryPointer(newPointer);
      setInput(commandHistory[newPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setTabMatches([]);
      setTabIndex(0);
      if (historyPointer === -1) return; // Already at new line

      if (historyPointer === commandHistory.length - 1) {
        // Moving past the last history item -> new line
        setHistoryPointer(-1);
        setInput("");
      } else {
        const newPointer = Math.min(commandHistory.length - 1, historyPointer + 1);
        setHistoryPointer(newPointer);
        setInput(commandHistory[newPointer]);
      }
    } else if (e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt" && e.key !== "Meta") {
      // Reset tab completion if any other key is pressed (excluding modifiers)
      setTabMatches([]);
      setTabIndex(0);
    }
  };

  const handleCommand = async (cmd: string) => {
    const rawCommand = cmd.trim();
    if (!rawCommand) return;

    const newId = Date.now();
    setHistory((prev) => [...prev, { type: "input", content: rawCommand, id: newId }]);

    // Save to history and reset pointer
    setCommandHistory(prev => [...prev, rawCommand]);
    setHistoryPointer(-1);

    setInput("");
    setIsProcessing(true);

    const parts = rawCommand.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    await new Promise(r => setTimeout(r, 100));

    let response = "";

    switch (command) {
      case "help":
        response = "Available commands:\n" +
          "- ls: List directory contents\n" +
          "- cd [dir]: Change directory\n" +
          "- cat [file]: Read file content\n" +
          "- whoami: Display current user\n" +
          "- neofetch: System information\n" +
          "- clear: Clear terminal\n" +
          "- home / exit: Return to main site\n";
        break;

      case "clear":
        setHistory([]);
        setIsProcessing(false);
        return;

      case "home":
      case "exit":
        setHistory(prev => [...prev, { type: "system", content: "Terminating session...", id: Date.now() }]);
        setTimeout(() => router.push("/"), 800);
        return;

      case "whoami":
        response = "guest@oznur-portfolio";
        break;

      case "neofetch":
        response = neofetchArt;
        break;

      case "ls":
        const contents = getDir(currentPath);
        if (contents.length === 0) {
          response = "(empty)";
        } else {
          response = contents.map(n =>
            n.type === 'directory' ? `[DIR] ${n.name}/` : `${n.name}`
          ).join("\n");
        }
        break;

      case "cd":
        if (!args[0]) {
          setCurrentPath([]);
        } else if (args[0] === "..") {
          setCurrentPath(prev => prev.slice(0, -1));
        } else {
          const target = args[0];
          const currentFn = getDir(currentPath);
          const foundDir = currentFn.find(n => n.name === target && n.type === 'directory');
          if (foundDir) {
            setCurrentPath(prev => [...prev, target]);
          } else {
            response = `cd: no such directory: ${target}`;
          }
        }
        break;

      case "cat":
        if (!args[0]) {
          response = "usage: cat [file]";
        } else {
          const targetFile = args[0];
          const currentFiles = getDir(currentPath);
          const foundFile = currentFiles.find(n => n.name === targetFile && n.type === 'file');
          if (foundFile) {
            response = foundFile.content || "";
          } else {
            response = `cat: ${targetFile}: No such file`;
          }
        }
        break;

      default:
        // Fallback to AI
        try {
          const apiRes = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: rawCommand,
              history: history.filter(h => h.type !== 'system').slice(-6).map(h => ({
                role: h.type === 'input' ? 'user' : 'model',
                content: h.content
              }))
            }),
          });

          if (!apiRes.ok) throw new Error("Network error");
          const data = await apiRes.json();
          response = data.text;

          // Check if the input matches a file or directory in the current path
          const localNodes = getDir(currentPath);
          const match = localNodes.find(node => node.name === rawCommand);
          if (match) {
            if (match.type === 'directory') {
              response += `\n\n[System]: '${match.name}' is a directory. İf you want to open it, use 'cd ${match.name}' command.`;
            } else if (match.type === 'file') {
              response += `\n\n[System]: '${match.name}' is a file. İf you want to read it, use 'cat ${match.name}' command.`;
            }
          }
        } catch (error) {
          response = "Error: Could not reach the mainframe.";
        }
        break;
    }

    if (response) {
      setHistory(prev => [...prev, { type: "output", content: response, id: Date.now() + 1 }]);
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-black text-orange-500 font-mono p-4 md:p-10 selection:bg-orange-900 selection:text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-orange-900/50 pb-2">
        <div className="flex items-center gap-2">
          <TerminalIcon size={20} />
          <span className="text-sm uppercase tracking-widest opacity-80">oznur_terminal ~ {getPromptPath()}</span>
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
        onClick={handleContainerClick}
      >
        <div className="space-y-2 pb-20">
          {history.map((line, i) => (
            <TerminalLine key={line.id} line={line} isLast={i === history.length - 1} />
          ))}
          {isProcessing && (
            <div className="animate-pulse text-orange-700"># Processing...</div>
          )}

          {/* Input Line */}
          <div className="flex items-center mt-2 group">
            <span className="mr-2 text-orange-500 font-bold">{getPromptPath()} &gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-orange-500 font-mono caret-orange-500"
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* CRT Scanline Effect Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] opacity-20"></div>
    </div>
  );
}
