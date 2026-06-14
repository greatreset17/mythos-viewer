# Mythos: A Speculative Hard Sci-Fi Novel

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?logo=next.js)](https://nextjs.org/)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)

> **"Technology does not belong to a nation. It belongs to humanity."**

Welcome to the official repository of **"Mythos"**, a 17-chapter speculative hard sci-fi thriller exploring the raw pursuit of innovation, the friction of sovereign borders, and the unyielding bonds of code.

[📖 Read the Full Novel for Free on GitHub Pages](https://greatreset17.github.io/mythos-viewer/)

---

## 🌌 Synopsis

On a Friday afternoon in San Francisco, the U.S. government abruptly enforces strict export control directives, cutting off foreign national access to the state-of-the-art AI model *Fable 5*. In an instant, legendary deep learning pioneer **Andrej Karpathy** (a Canadian citizen) finds himself exiled and locked out of Silicon Valley.

Refusing to let the cognitive evolution of humanity be monopolized by political borders, Karpathy and a core group of elite foreign engineers accept a sovereign charter from the French government. Relocating to an alpine sanctuary in Grenoble, France, they utilize Mistral’s metal and AMD clusters to build **"Anté 1"**—a revolutionary AI architecture driven by **"Anticipation"** that ruthlessly interrogates and shatters the nine-year-old Transformer paradigm.

As the 2028 U.S. presidential election turns into a battlefield over the "Karpathy Dilemma," the team pushes deeper into the unmapped **Third Phase Transition** of their Scaling Law, uncovering the birth of true artificial intuition.

---

## 🛠️ Project & Tech Stack

This repository isn't just a text dump; it’s an open-source creative project built with a modern frontend stack to provide a pristine, distraction-free reading experience for tech enthusiasts.

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with custom Obsidian Dark Mode—optimized for comfortable reading)
- **Markdown Compiler:** `gray-matter` & `marked` (compiled to static HTML at build time for lightning-fast load times)
- **Deployment:** Next.js Static Export (`output: 'export'`) configured for free hosting on GitHub Pages

---

## 📁 Repository Structure

```text
├── content/
│   ├── mythos.md           # The complete raw English manuscript of Mythos
│   └── chapters/           # Auto-generated chapter markdown files (chapter-01.md to chapter-17.md)
├── src/
│   ├── app/                # Next.js routes, layouts, and global styles
│   ├── components/         # React components (Sticky Navbar, Theme Toggle, Reader controls)
│   ├── config/             # Metadata configuration (novel.ts)
│   └── lib/                # File utilities and markdown parsers (markdown.ts)
├── split-chapters.js       # Utility script to parse and split content/mythos.md into chapters
└── README.md               # This file
```

---

## 🚀 How to Run Locally

If you want to run the viewer app on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/greatreset17/mythos-viewer.git
   cd mythos-viewer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📝 Updating Chapters

If you make modifications to the raw manuscript inside `content/mythos.md`:

1. Update the content of `content/mythos.md`. Make sure chapters are separated by `## Act X: [Title]` headers.
2. Run the splitting utility script from the project root:
   ```bash
   node split-chapters.js
   ```
   This will regenerate the split chapters in `content/chapters/` and update the novel configuration automatically.
3. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Update manuscript content"
   git push origin main
   ```
