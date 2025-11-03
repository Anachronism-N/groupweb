import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type CourseReflection = {
  title: string;
  chapter: string;
  topic: string;
  period: string;
  reflections: string[];
  content: string;
};

function parseFilenameChapter(filename: string): number | null {
  const match = filename.match(/chapter[-_ ]?(\d+)/i);
  return match ? parseInt(match[1], 10) : null;
}

function toChapterLabel(num: number | null): string {
  if (!num || Number.isNaN(num)) return "Chapter";
  return `Chapter ${num}`;
}

function chapterNumFromLabel(label: string): number {
  const match = label.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function extractReflections(content: string): string[] {
  const lines = content.split(/\r?\n/);
  const bulletItems: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^[-*+]\s+/.test(trimmed)) {
      bulletItems.push(trimmed.replace(/^[-*+]\s+/, ""));
    }
  }

  if (bulletItems.length > 0) return bulletItems.slice(0, 50);

  // Fallback: split by paragraphs
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return paragraphs.slice(0, 50);
}

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "tutorial");
    const exists = fs.existsSync(dir);
    if (!exists) {
      return NextResponse.json([] satisfies CourseReflection[]);
    }

    const files = fs.readdirSync(dir);
    const mdFiles = files.filter((f) => /\.(md|mdx)$/i.test(f));

    const items: CourseReflection[] = mdFiles.map((file) => {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, "utf-8");
      const { data, content } = matter(raw);

      const chapterNum =
        (data.chapter as number) ?? parseFilenameChapter(file) ?? 0;
      const chapterLabel =
        (data.chapterLabel as string) ?? toChapterLabel(chapterNum);

      const reflections = extractReflections(content);

      return {
        title: (data.title as string) ?? chapterLabel,
        chapter: chapterLabel,
        topic: (data.topic as string) ?? "",
        period: (data.period as string) ?? "",
        reflections,
        content,
      };
    });

    items.sort(
      (a, b) => chapterNumFromLabel(a.chapter) - chapterNumFromLabel(b.chapter),
    );

    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
