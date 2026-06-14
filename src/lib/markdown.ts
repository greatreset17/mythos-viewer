import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const chaptersDirectory = path.join(process.cwd(), 'content/chapters');

export interface ChapterMeta {
  id: number;
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
}

export interface ChapterData extends ChapterMeta {
  contentHtml: string;
}

// Ensure the directory exists
function ensureChaptersDirectory() {
  if (!fs.existsSync(chaptersDirectory)) {
    fs.mkdirSync(chaptersDirectory, { recursive: true });
  }
}

export function getAllChapters(): ChapterMeta[] {
  ensureChaptersDirectory();
  const fileNames = fs.readdirSync(chaptersDirectory);
  
  const allChaptersData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(chaptersDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id: Number(data.id || 0),
        slug: (data.slug || fileName.replace(/\.md$/, '')) as string,
        title: (data.title || 'Untitled Chapter') as string,
        publishedAt: (data.publishedAt || '') as string,
        summary: (data.summary || '') as string,
      };
    });

  // Sort chapters by id ascending
  return allChaptersData.sort((a, b) => a.id - b.id);
}

export function getChapterData(slug: string): ChapterData {
  ensureChaptersDirectory();
  // Find file matching the slug
  const fileNames = fs.readdirSync(chaptersDirectory);
  const matchedFile = fileNames.find((fileName) => {
    if (!fileName.endsWith('.md')) return false;
    const fullPath = path.join(chaptersDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return data.slug === slug || fileName.replace(/\.md$/, '') === slug;
  });

  if (!matchedFile) {
    throw new Error(`Chapter not found for slug: ${slug}`);
  }

  const fullPath = path.join(chaptersDirectory, matchedFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML synchronously
  const contentHtml = marked.parse(content) as string;

  return {
    id: Number(data.id || 0),
    slug: (data.slug || matchedFile.replace(/\.md$/, '')) as string,
    title: (data.title || 'Untitled Chapter') as string,
    publishedAt: (data.publishedAt || '') as string,
    summary: (data.summary || '') as string,
    contentHtml,
  };
}
