"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Type, 
  ChevronUp, 
  BookOpen, 
  Menu, 
  X,
  Clock,
  Calendar
} from "lucide-react";
import { ChapterData, ChapterMeta } from "@/lib/markdown";

interface ChapterReaderProps {
  chapter: ChapterData;
  allChapters: ChapterMeta[];
  prevChapter: ChapterMeta | null;
  nextChapter: ChapterMeta | null;
}

type FontSize = "sm" | "md" | "lg" | "xl";
type FontFamily = "serif" | "sans";

const FONT_SIZE_CLASSES: Record<FontSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

export default function ChapterReader({
  chapter,
  allChapters,
  prevChapter,
  nextChapter,
}: ChapterReaderProps) {
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [fontFamily, setFontFamily] = useState<FontFamily>("serif");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedSize = localStorage.getItem("reader-font-size") as FontSize;
    const savedFamily = localStorage.getItem("reader-font-family") as FontFamily;
    if (savedSize) setFontSize(savedSize);
    if (savedFamily) setFontFamily(savedFamily);
  }, []);

  // Sync scroll progress and toggle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem("reader-font-size", size);
  };

  const handleFontFamilyChange = (family: FontFamily) => {
    setFontFamily(family);
    localStorage.setItem("reader-font-family", family);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col flex-1 pb-24">
      {/* Top Scroll Progress Bar */}
      <div 
        className="fixed top-16 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 z-40"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-linear-to-r from-indigo-500 to-emerald-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Reading Container */}
      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        
        {/* Breadcrumbs / Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-zinc-500 hover:text-cyber-indigo dark:text-zinc-400 dark:hover:text-emerald-400 mb-8 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Overview
        </Link>

        {/* Chapter Header */}
        <article className="space-y-6 mb-12 border-b border-zinc-200/50 pb-8 dark:border-zinc-800/50">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold text-cyber-indigo dark:text-emerald-400 tracking-widest uppercase">
              Chapter {String(chapter.id).padStart(2, "0")}
            </span>
            <span className="text-zinc-300 dark:text-zinc-800 select-none">•</span>
            <span className="inline-flex items-center gap-1 font-sans text-xs text-zinc-400 dark:text-zinc-500">
              <Calendar size={12} />
              {chapter.publishedAt}
            </span>
            <span className="text-zinc-300 dark:text-zinc-800 select-none">•</span>
            <span className="inline-flex items-center gap-1 font-sans text-xs text-zinc-400 dark:text-zinc-500">
              <Clock size={12} />
              5 min read
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight text-zinc-900 dark:text-white leading-tight">
            {chapter.title}
          </h1>

          {chapter.summary && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-100/30 p-4 dark:border-zinc-850 dark:bg-zinc-900/30">
              <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-normal italic">
                <strong className="font-sans font-bold uppercase tracking-wider text-[10px] text-zinc-400 dark:text-zinc-500 not-italic mr-2">
                  Synopsis:
                </strong>
                {chapter.summary}
              </p>
            </div>
          )}
        </article>

        {/* Chapter Content Area */}
        <div 
          className={`prose ${FONT_SIZE_CLASSES[fontSize]} ${
            fontFamily === "serif" ? "font-serif" : "font-sans"
          } text-zinc-850 dark:text-zinc-200 transition-all duration-200 max-w-none`}
          dangerouslySetInnerHTML={{ __html: chapter.contentHtml }}
        />

        {/* End of Chapter Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          {prevChapter ? (
            <Link
              href={`/chapter/${prevChapter.slug}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 font-sans font-bold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white transition-all shadow-xs group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Previous</span>
                <span className="text-sm mt-1 line-clamp-1 max-w-[200px]">{prevChapter.title.replace(/^Chapter \d+:\s*/i, "")}</span>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block w-[1px]" />
          )}

          {nextChapter ? (
            <Link
              href={`/chapter/${nextChapter.slug}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 font-sans font-bold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white transition-all shadow-xs group"
            >
              <div className="flex flex-col items-end leading-none text-right">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Next</span>
                <span className="text-sm mt-1 line-clamp-1 max-w-[200px]">{nextChapter.title.replace(/^Chapter \d+:\s*/i, "")}</span>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-100/30 px-5 py-3.5 text-center font-sans font-bold text-zinc-400 dark:border-zinc-850 dark:bg-zinc-900/10 dark:text-zinc-600 w-full sm:w-auto">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-555 uppercase tracking-widest font-mono block">Stay Tuned</span>
              <span className="text-sm">End of current transmission</span>
            </div>
          )}
        </div>
      </main>

      {/* Floating Reader Controls & Utility Dock */}
      <div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 transition-all duration-300"
        role="toolbar"
        aria-label="Reader settings"
      >
        {/* Table of Contents Trigger */}
        <button
          onClick={() => setIsTocOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
          title="Table of Contents"
        >
          <Menu size={16} />
        </button>

        <span className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

        {/* Font Family Toggle */}
        <button
          onClick={() => handleFontFamilyChange(fontFamily === "serif" ? "sans" : "serif")}
          className={`flex h-9 px-3 items-center justify-center gap-1 rounded-full text-xs font-bold font-sans transition-all ${
            fontFamily === "serif"
              ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          }`}
          title={`Switch to ${fontFamily === "serif" ? "Sans-Serif" : "Serif"} font`}
        >
          <Type size={14} />
          {fontFamily === "serif" ? "Serif" : "Sans"}
        </button>

        <span className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

        {/* Font Size decrease */}
        <button
          onClick={() => {
            if (fontSize === "xl") handleFontSizeChange("lg");
            else if (fontSize === "lg") handleFontSizeChange("md");
            else if (fontSize === "md") handleFontSizeChange("sm");
          }}
          disabled={fontSize === "sm"}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors"
          title="Decrease Font Size"
        >
          <span className="text-xs font-bold font-sans">A-</span>
        </button>

        {/* Font Size indicator */}
        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 px-1 font-sans select-none capitalize">
          {fontSize}
        </span>

        {/* Font Size increase */}
        <button
          onClick={() => {
            if (fontSize === "sm") handleFontSizeChange("md");
            else if (fontSize === "md") handleFontSizeChange("lg");
            else if (fontSize === "lg") handleFontSizeChange("xl");
          }}
          disabled={fontSize === "xl"}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors"
          title="Increase Font Size"
        >
          <span className="text-sm font-bold font-sans">A+</span>
        </button>

        {showScrollTop && (
          <>
            <span className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />
            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors animate-fade-in"
              title="Scroll to Top"
            >
              <ChevronUp size={16} />
            </button>
          </>
        )}
      </div>

      {/* Table of Contents Slide-over Drawer */}
      {isTocOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsTocOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 dark:bg-[#080b12] border-l border-zinc-200 dark:border-zinc-800 animate-slide-in duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-150 dark:border-zinc-850">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-cyber-indigo dark:text-emerald-400" />
                <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">
                  Table of Contents
                </h3>
              </div>
              <button
                onClick={() => setIsTocOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:text-zinc-450 dark:hover:text-white transition-all"
                title="Close drawer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chapter List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {allChapters.map((ch) => {
                const isActive = ch.slug === chapter.slug;
                return (
                  <Link
                    key={ch.id}
                    href={`/chapter/${ch.slug}`}
                    onClick={() => setIsTocOpen(false)}
                    className={`block p-4 rounded-xl border transition-all ${
                      isActive
                        ? "border-cyber-indigo bg-indigo-50/30 text-zinc-900 dark:border-emerald-500 dark:bg-emerald-950/10 dark:text-white"
                        : "border-zinc-150 hover:border-zinc-300 dark:border-zinc-850 dark:hover:border-zinc-750"
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-1">
                      <span>Chapter {String(ch.id).padStart(2, "0")}</span>
                      <span>{ch.publishedAt}</span>
                    </div>
                    <h4 className={`font-sans font-bold text-sm leading-tight transition-colors ${
                      isActive 
                        ? "text-cyber-indigo dark:text-emerald-400" 
                        : "text-zinc-800 dark:text-zinc-200"
                    }`}>
                      {ch.title.replace(/^Chapter \d+:\s*/i, "")}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
