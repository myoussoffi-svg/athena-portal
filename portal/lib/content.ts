import fs from "fs";
import path from "path";
import { globSync } from "glob";
import yaml from "js-yaml";

const contentRoot =
  process.env.CONTENT_ROOT?.trim() ||
  path.join(__dirname, "..", "..", "content");
export type Track = {
  id: string;
  slug: string;
  title: string;
  description?: string;
};

export type Module = {
  id: string;
  slug: string;
  title: string;
  description?: string;
};

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  body?: string;
};

function readYamlFile<T = unknown>(filePath: string): T {
const raw = fs.readFileSync(filePath, "utf8");
  return yaml.load(raw) as T;
}

function safeReadFile(filePath: string): string {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function titleFromMarkdown(md: string, fallback: string): string {
  // Grab first H1 like "# Title"
  const m = md.match(/^#\s+(.+)\s*$/m);
  return (m?.[1] ?? fallback).trim();
}

function stripFrontmatter(md: string): string {
  // Remove leading UTF-8 BOM if present, then strip YAML frontmatter
  const clean = md.replace(/^\uFEFF/, "");
  return clean.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

export function getTracks(): Track[] {
  if (!fs.existsSync(contentRoot)) {
    throw new Error(`contentRoot does not exist: ${contentRoot}`);
  }

  const entries = fs.readdirSync(contentRoot, { withFileTypes: true });

  return entries
    .filter((e) => e.isDirectory())
    .map((dir) => {
      const trackSlug = dir.name;

      const trackYamlPath = path.join(contentRoot, trackSlug, "track.yaml");
      if (fs.existsSync(trackYamlPath)) {
        const data = readYamlFile<{ id?: string; title?: string; description?: string }>(trackYamlPath);
        const slug = data.id ?? trackSlug;
        return {
          id: slug,
          slug,
          title: data.title ?? slug,
          description: data.description ?? "",
        };
      }

      return {
        id: trackSlug,
        slug: trackSlug,
        title: trackSlug,
        description: "",
      };
    });
}

export function getModulesForTrack(trackSlug: string): Module[] {
  if (!trackSlug) throw new Error("getModulesForTrack: trackSlug is required");

  const pattern = path
    .join(contentRoot, trackSlug, "*/module.yaml")
    .replace(/\\/g, "/");

  const moduleYamlPaths = globSync(pattern);

  return moduleYamlPaths.map((yamlPath) => {
    const moduleDir = path.dirname(yamlPath);
    const slug = path.basename(moduleDir);
    const data = readYamlFile<{ id?: string; title?: string; description?: string }>(yamlPath);

    return {
      id: data.id ?? slug,
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
    };
  });
}

export function getLessonsForModule(trackSlug: string, moduleSlug: string): Lesson[] {
  if (!trackSlug || !moduleSlug) {
    throw new Error("getLessonsForModule: trackSlug and moduleSlug are required");
  }

  const moduleDir = path.join(contentRoot, trackSlug, moduleSlug);
  if (!fs.existsSync(moduleDir)) return [];

  const lessons: Lesson[] = [];

  // A) Folder-based lessons: <module>/<lessonSlug>/lesson.yaml
  const lessonDirs = fs
    .readdirSync(moduleDir, { withFileTypes: true })
    .filter((e) => e.isDirectory());

  for (const dir of lessonDirs) {
    const lessonYamlPath = path.join(moduleDir, dir.name, "lesson.yaml");
    if (!fs.existsSync(lessonYamlPath)) continue;

    const data = readYamlFile<{ id?: string; title?: string; description?: string; content?: string }>(lessonYamlPath);
    lessons.push({
      id: data.id ?? dir.name,
      slug: dir.name,
      title: data.title ?? dir.name,
      description: data.description ?? "",
      content: data.content ?? "",
    });
  }

  // B) Markdown-file lessons: <module>/<lessonSlug>.md
  // Ex: 01-foo.md, 02-bar.md
  const mdFiles = fs
    .readdirSync(moduleDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".md"))
    .map((e) => e.name)
    .filter((name) => name.toLowerCase() !== "readme.md"); // optional

  for (const fileName of mdFiles) {
    const slug = fileName.replace(/\.md$/i, "");
    const mdPath = path.join(moduleDir, fileName);
    const md = safeReadFile(mdPath);

    lessons.push({
      id: slug,
      slug,
      title: titleFromMarkdown(md, slug),
      description: "",
      content: stripFrontmatter(md),
    });
  }

  // Sort: try numeric prefix (01-, 02-, etc) first; otherwise alpha
  lessons.sort((a, b) => {
    const anum = parseInt((a.slug.match(/^(\d+)/)?.[1] ?? ""), 10);
    const bnum = parseInt((b.slug.match(/^(\d+)/)?.[1] ?? ""), 10);
    const aHas = Number.isFinite(anum);
    const bHas = Number.isFinite(bnum);
    if (aHas && bHas) return anum - bnum;
    if (aHas) return -1;
    if (bHas) return 1;
    return a.slug.localeCompare(b.slug);
  });

  // Deduplicate if same slug appears in both systems
  const seen = new Set<string>();
  return lessons.filter((l) => {
    if (seen.has(l.slug)) return false;
    seen.add(l.slug);
    return true;
  });
}

export function getLessonBySlug(trackSlug: string, moduleSlug: string, lessonSlug: string): Lesson | null {
  if (!trackSlug || !moduleSlug || !lessonSlug) return null;

  // A) Folder-based: <module>/<lessonSlug>/lesson.yaml
  const lessonYamlPath = path.join(contentRoot, trackSlug, moduleSlug, lessonSlug, "lesson.yaml");
  if (fs.existsSync(lessonYamlPath)) {
    const data = readYamlFile<{ id?: string; title?: string; description?: string; content?: string }>(lessonYamlPath);
    return {
      id: data.id ?? lessonSlug,
      slug: lessonSlug,
      title: data.title ?? lessonSlug,
      description: data.description ?? "",
      content: data.content ?? "",
    };
  }

  // B) Markdown-file: <module>/<lessonSlug>.md
  const mdPath = path.join(contentRoot, trackSlug, moduleSlug, `${lessonSlug}.md`);
  if (fs.existsSync(mdPath)) {
    const md = safeReadFile(mdPath);
    return {
      id: lessonSlug,
      slug: lessonSlug,
      title: titleFromMarkdown(md, lessonSlug),
      description: "",
      content: stripFrontmatter(md),
    };
  }

  return null;
}







