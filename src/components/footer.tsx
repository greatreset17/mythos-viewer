import { novelConfig } from "@/config/novel";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200/50 bg-zinc-50 dark:border-zinc-800/50 dark:bg-[#0b0f19] py-8 mt-auto transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left column */}
        <div className="text-center md:text-left">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {currentYear} <strong>{novelConfig.title}</strong> by {novelConfig.author}. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 max-w-md">
            Disclaimer: This is a work of fiction. Names, characters, businesses, places, events, locales, and incidents are either the products of the author’s imagination or used in a fictitious manner.
          </p>
        </div>

        {/* Right column */}
        <div className="flex gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <a
            href={novelConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyber-indigo transition-colors"
          >
            GitHub
          </a>
          <span className="text-zinc-300 dark:text-zinc-800">|</span>
          <span className="text-zinc-400 dark:text-zinc-500">
            Powered by Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
