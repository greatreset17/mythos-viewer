const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const inputPath = path.join(__dirname, 'content/mythos.md');
if (!fs.existsSync(inputPath)) {
  console.error("mythos.md not found in content/");
  process.exit(1);
}

console.log("Reading mythos.md...");
const fileContents = fs.readFileSync(inputPath, 'utf8');

// Parse global frontmatter
const { data: globalMeta, content: bodyContent } = matter(fileContents);

// Split on Act headings
const parts = bodyContent.split(/(?=^## Act )/m).filter(p => p.trim().length > 0);
const validParts = parts.filter(part => part.includes('## Act '));
console.log(`Found ${validParts.length} valid chapters.`);

// Delete existing mock chapters to avoid duplicates
const chaptersDir = path.join(__dirname, 'content/chapters');
const files = fs.readdirSync(chaptersDir);
files.forEach(f => {
  if (f.startsWith('chapter-') && f.endsWith('.md')) {
    fs.unlinkSync(path.join(chaptersDir, f));
  }
});

// Process each part
validParts.forEach((part, index) => {
  const lines = part.split('\n');
  const headingLineIndex = lines.findIndex(l => l.startsWith('## Act '));
  if (headingLineIndex === -1) return;

  const headingLine = lines[headingLineIndex];
  
  // Extract title: e.g. "## Act I: 5:21 PM" -> "Act I: 5:21 PM"
  const titleText = headingLine.replace(/^## /, '').trim();
  
  // Extract Act number and title details
  const match = titleText.match(/Act\s+([I|V|X]+):\s*(.*)/i);
  const actNumStr = match ? match[1] : '';
  const chapterId = index + 1;
  const slug = `chapter-${String(chapterId).padStart(2, '0')}`;
  
  // Get content after the heading line
  let chapterContent = lines.slice(headingLineIndex + 1).join('\n').trim();
  
  // Strip trailing separators (like ---)
  if (chapterContent.endsWith('---')) {
    chapterContent = chapterContent.slice(0, -3).trim();
  }
  
  // Create summary from first few sentences
  const cleanText = chapterContent
    .replace(/[#*`~_]/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Take first sentence or first 160 characters
  let summary = cleanText.split(/[.!?]\s/)[0];
  if (summary) {
    summary += '.';
  } else {
    summary = cleanText.substring(0, 120) + '...';
  }
  if (summary.length > 180) {
    summary = summary.substring(0, 177) + '...';
  }

  // Generate publication dates counting backward from today
  const date = new Date();
  date.setDate(date.getDate() - (validParts.length - chapterId));
  const formattedDate = date.toISOString().split('T')[0];

  const chapterFrontmatter = {
    id: chapterId,
    slug: slug,
    title: titleText,
    publishedAt: formattedDate,
    summary: summary || `Act ${actNumStr} of the novel Mythos.`
  };

  const outputContent = matter.stringify(chapterContent, chapterFrontmatter);
  const outPath = path.join(chaptersDir, `${slug}.md`);
  fs.writeFileSync(outPath, outputContent, 'utf8');
  console.log(`Generated ${slug}.md: ${titleText}`);
});

// Update src/config/novel.ts with global metadata
const configPath = path.join(__dirname, 'src/config/novel.ts');
if (fs.existsSync(configPath)) {
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  if (globalMeta.title) {
    configContent = configContent.replace(/title:\s*"[^"]*"/, `title: "${globalMeta.title}"`);
  }
  
  if (globalMeta.synopsis) {
    // Escape quotes and backslashes for JS string
    const escapedSynopsis = globalMeta.synopsis.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
    configContent = configContent.replace(/description:\s*"[^"]*"/, `description: "${escapedSynopsis}"`);
  }
  
  // Update totalPlanned to actual split chapters count
  configContent = configContent.replace(/totalChaptersPlanned:\s*\d+/, `totalChaptersPlanned: ${validParts.length}`);

  fs.writeFileSync(configPath, configContent, 'utf8');
  console.log(`Updated novel config with title: "${globalMeta.title}" and total chapters: ${validParts.length}`);
}

console.log("Chapter splitting completed successfully!");
