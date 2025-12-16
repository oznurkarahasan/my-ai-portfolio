"use client";

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { ChatBot } from "@/components/ChatBot";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen text-slate-200 selection:bg-orange-500/30">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
        <ChatBot />

        <footer className="py-8 text-center text-stone-500 text-sm border-t border-stone-900 bg-stone-950">
          <p>© {new Date().getFullYear()} My AI Portfolio.</p>
        </footer>
      </main>
    </LanguageProvider>
  );
}
