"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, BookOpen } from "lucide-react";
import { novelConfig } from "@/config/novel";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-[#0b0f19]/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyber-indigo text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BookOpen size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-zinc-900 dark:text-white leading-none tracking-tight">
              {novelConfig.title}
            </span>
            <span className="text-[10px] font-sans font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 tracking-wider uppercase">
              By {novelConfig.author}
            </span>
          </div>
        </Link>

        {/* Right Nav Options */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {novelConfig.status === "ongoing" ? "Ongoing" : "Completed"}
          </span>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-all"
            aria-label="Toggle Theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={18} className="text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon size={18} className="text-indigo-500 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* GitHub link */}
          <a
            href={novelConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-all"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </header>
  );
}
