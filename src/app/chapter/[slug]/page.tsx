import { getChapterData, getAllChapters } from "@/lib/markdown";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChapterReader from "@/components/chapter-reader";
import { Metadata } from "next";
import { novelConfig } from "@/config/novel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for Next.js static export
export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((ch) => ({
    slug: ch.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const chapter = getChapterData(slug);
    return {
      title: `${chapter.title} — ${novelConfig.title}`,
      description: chapter.summary || `Read ${chapter.title} of ${novelConfig.title}, a sci-fi thriller web novel by ${novelConfig.author}.`,
      openGraph: {
        title: `${chapter.title} — ${novelConfig.title}`,
        description: chapter.summary,
        type: "article",
      },
    };
  } catch {
    return {
      title: `Chapter — ${novelConfig.title}`,
    };
  }
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterData(slug);
  const allChapters = getAllChapters();

  // Find index to calculate previous/next links
  const currentIndex = allChapters.findIndex((ch) => ch.slug === chapter.slug);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ChapterReader
        chapter={chapter}
        allChapters={allChapters}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
      />
      <Footer />
    </div>
  );
}
