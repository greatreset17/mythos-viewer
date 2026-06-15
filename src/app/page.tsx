import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAllChapters } from "@/lib/markdown";
import { novelConfig } from "@/config/novel";
import { Play, Calendar, Lock, ArrowRight, BookOpen, Clock } from "lucide-react";

export default function Home() {
  const availableChapters = getAllChapters();
  const firstChapterSlug = availableChapters.length > 0 ? availableChapters[0].slug : "";

  // Generate placeholder list for planned but locked chapters
  const totalPlanned = novelConfig.totalChaptersPlanned;
  const lockedChaptersCount = Math.max(0, totalPlanned - availableChapters.length);
  const lockedChapters = Array.from({ length: lockedChaptersCount }, (_, i) => {
    const chapterNum = availableChapters.length + i + 1;
    return {
      id: chapterNum,
      title: `Chapter ${chapterNum}`,
      summary: "Classified payload encryption active. Future transmission pending author broadcast.",
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-linear-to-b from-zinc-100 to-zinc-50 dark:border-zinc-800/40 dark:from-[#0b0f19] dark:to-[#080b12] py-20 md:py-28 transition-colors duration-300">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.03)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center sm:text-left flex flex-col md:flex-row items-center gap-10 md:gap-14">
          
          {/* Cover Art Mockup */}
          <div className="relative group shrink-0 select-none">
            <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-violet-600 to-emerald-500 opacity-30 blur-lg group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex flex-col justify-between aspect-[3/4] w-56 rounded-2xl border border-zinc-200/50 bg-[#0f172a] p-6 shadow-2xl text-white dark:border-zinc-800/50">
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold tracking-widest text-emerald-400 uppercase">
                  CLASSIFIED // DATA
                </span>
                <h2 className="font-sans font-black text-2xl tracking-tight leading-none text-zinc-100">
                  {novelConfig.title}
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="h-0.5 w-12 bg-emerald-400" />
                <div className="text-[10px] font-mono text-zinc-400 leading-normal">
                  SYS.ID: MT-8092<br />
                  ENCRYPT: SHA-256<br />
                  LOC: SAN FRANCISCO, CA
                </div>
                <div className="font-sans font-bold text-[11px] tracking-wider text-zinc-300 uppercase mt-2">
                  By {novelConfig.author}
                </div>
              </div>
            </div>
          </div>

          {/* Book Info */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-950/30 dark:text-emerald-400">
              <span className={`h-1.5 w-1.5 rounded-full ${novelConfig.status === "completed" ? "bg-emerald-500" : "bg-emerald-500 animate-pulse"}`} />
              Serial Web Novel — {novelConfig.status === "completed" ? "Completed" : "Ongoing"}
            </div>

            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight text-zinc-900 dark:text-white leading-tight">
              {novelConfig.title}
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif text-lg max-w-2xl">
              {novelConfig.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              {firstChapterSlug ? (
                <Link
                  href={`/chapter/${firstChapterSlug}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-cyber-indigo px-6 py-3 font-sans font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Play size={16} fill="currentColor" />
                  Start Reading
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-zinc-300 px-6 py-3 font-sans font-bold text-zinc-500 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600"
                >
                  No chapters uploaded
                </button>
              )}

              <a
                href="#chapters"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 font-sans font-bold text-zinc-600 shadow-xs hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-all"
              >
                <BookOpen size={16} />
                Table of Chapters ({availableChapters.length}/{totalPlanned})
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section id="chapters" className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-16 transition-colors duration-300">
        <h2 className="font-sans font-extrabold text-2xl tracking-tight text-zinc-900 dark:text-white mb-8 border-b border-zinc-200/50 pb-4 dark:border-zinc-800/50">
          Table of Chapters
        </h2>

        <div className="grid gap-4 sm:gap-6">
          {/* Available Chapters */}
          {availableChapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/chapter/${chapter.slug}`}
              className="group block rounded-2xl border border-zinc-200/60 bg-white p-5 sm:p-6 shadow-xs hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:border-zinc-700/60 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-mono text-xs font-bold text-cyber-indigo tracking-widest uppercase">
                      Chapter {String(chapter.id).padStart(2, "0")}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-zinc-400 dark:text-zinc-500">
                      <Calendar size={12} />
                      {chapter.publishedAt}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-zinc-400 dark:text-zinc-500">
                      <Clock size={12} />
                      5 min read
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 group-hover:text-cyber-indigo dark:group-hover:text-emerald-400 transition-colors leading-tight">
                    {chapter.title.includes("Chapter") ? chapter.title.split(":")[1]?.trim() || chapter.title : chapter.title}
                  </h3>

                  <p className="font-serif text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 max-w-3xl">
                    {chapter.summary}
                  </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-400 group-hover:bg-cyber-indigo group-hover:border-cyber-indigo group-hover:text-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-600 dark:group-hover:bg-emerald-450 dark:group-hover:border-emerald-450 transition-all duration-300">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}

          {/* Locked Chapters */}
          {lockedChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="relative select-none rounded-2xl border border-dashed border-zinc-200/80 bg-zinc-100/30 p-5 sm:p-6 opacity-60 dark:border-zinc-800/80 dark:bg-zinc-900/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
                      Chapter {String(chapter.id).padStart(2, "0")}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-850 select-none">•</span>
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-zinc-400 dark:text-zinc-600">
                      <Lock size={11} />
                      Classified
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg text-zinc-400 dark:text-zinc-650 leading-tight">
                    Transmission Encrypted
                  </h3>

                  <p className="font-serif text-sm text-zinc-400 dark:text-zinc-600 leading-relaxed italic">
                    {chapter.summary}
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-850 dark:bg-zinc-900/40 dark:text-zinc-700">
                  <Lock size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      <Footer />
    </div>
  );
}
