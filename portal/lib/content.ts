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

export type VideoProvider = 'youtube' | 'vimeo' | 'mux' | 'cloudflare';

export type LessonVideo = {
  provider: VideoProvider;
  id: string;
  poster?: string;
  duration?: number;
  captions?: string;
};

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  body?: string;
  video?: LessonVideo;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle?: string;
  content?: string;
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

interface Frontmatter {
  video?: {
    provider?: string;
    id?: string;
    poster?: string;
    duration?: number;
    captions?: string;
  };
  [key: string]: unknown;
}

function parseFrontmatter(md: string): { frontmatter: Frontmatter; content: string } {
  const clean = md.replace(/^\uFEFF/, "");
  const match = clean.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, content: clean };
  }

  try {
    const frontmatter = yaml.load(match[1]) as Frontmatter || {};
    return { frontmatter, content: match[2] };
  } catch {
    return { frontmatter: {}, content: clean };
  }
}

function parseVideoMetadata(data: { video?: { provider?: string; id?: string; poster?: string; duration?: number; captions?: string } }): LessonVideo | undefined {
  if (!data.video || !data.video.provider || !data.video.id) {
    return undefined;
  }

  const provider = data.video.provider as VideoProvider;
  if (!['youtube', 'vimeo', 'mux', 'cloudflare'].includes(provider)) {
    return undefined;
  }

  return {
    provider,
    id: data.video.id,
    poster: data.video.poster,
    duration: data.video.duration,
    captions: data.video.captions,
  };
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

      // Try course.yaml first (preferred), then fall back to track.yaml
      const courseYamlPath = path.join(contentRoot, trackSlug, "course.yaml");
      const trackYamlPath = path.join(contentRoot, trackSlug, "track.yaml");

      const yamlPath = fs.existsSync(courseYamlPath) ? courseYamlPath :
                       fs.existsSync(trackYamlPath) ? trackYamlPath : null;

      if (yamlPath) {
        const data = readYamlFile<{ id?: string; title?: string; description?: string }>(yamlPath);
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

  const modules = moduleYamlPaths.map((yamlPath) => {
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

  // Sort modules by their numeric prefix (01-, 02-, etc.)
  modules.sort((a, b) => {
    const aNum = parseInt((a.slug.match(/^(\d+)/)?.[1] ?? ""), 10);
    const bNum = parseInt((b.slug.match(/^(\d+)/)?.[1] ?? ""), 10);
    const aHas = Number.isFinite(aNum);
    const bHas = Number.isFinite(bNum);
    if (aHas && bHas) return aNum - bNum;
    if (aHas) return -1;
    if (bHas) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return modules;
}

export function getLessonsForModule(trackSlug: string, moduleSlug: string): Lesson[] {
  if (!trackSlug || !moduleSlug) {
    throw new Error("getLessonsForModule: trackSlug and moduleSlug are required");
  }

  const moduleDir = path.join(contentRoot, trackSlug, moduleSlug);
  if (!fs.existsSync(moduleDir)) return [];

  // Read module.yaml to get the explicit lessons list (if defined)
  const moduleYamlPath = path.join(moduleDir, "module.yaml");
  let allowedLessons: Set<string> | null = null;
  if (fs.existsSync(moduleYamlPath)) {
    const moduleData = readYamlFile<{ lessons?: string[] }>(moduleYamlPath);
    if (moduleData.lessons && Array.isArray(moduleData.lessons)) {
      allowedLessons = new Set(moduleData.lessons);
    }
  }

  const lessons: Lesson[] = [];

  // A) Folder-based lessons: <module>/<lessonSlug>/lesson.yaml
  const lessonDirs = fs
    .readdirSync(moduleDir, { withFileTypes: true })
    .filter((e) => e.isDirectory());

  for (const dir of lessonDirs) {
    // Skip if module.yaml has a lessons array and this isn't in it
    if (allowedLessons && !allowedLessons.has(dir.name)) continue;

    const lessonYamlPath = path.join(moduleDir, dir.name, "lesson.yaml");
    if (!fs.existsSync(lessonYamlPath)) continue;

    const data = readYamlFile<{ id?: string; title?: string; description?: string; content?: string; video?: { provider?: string; id?: string; poster?: string; duration?: number; captions?: string } }>(lessonYamlPath);
    lessons.push({
      id: data.id ?? dir.name,
      slug: dir.name,
      title: data.title ?? dir.name,
      description: data.description ?? "",
      content: data.content ?? "",
      video: parseVideoMetadata(data),
    });
  }

  // B) Markdown-file lessons: <module>/<lessonSlug>.md
  // Ex: 01-foo.md, 02-bar.md
  const mdFiles = fs
    .readdirSync(moduleDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".md"))
    .map((e) => e.name)
    .filter((name) => name.toLowerCase() !== "readme.md");

  for (const fileName of mdFiles) {
    const slug = fileName.replace(/\.md$/i, "");

    // Skip if module.yaml has a lessons array and this slug isn't in it
    if (allowedLessons && !allowedLessons.has(slug)) continue;

    const mdPath = path.join(moduleDir, fileName);
    const md = safeReadFile(mdPath);
    const { frontmatter, content } = parseFrontmatter(md);

    lessons.push({
      id: slug,
      slug,
      title: titleFromMarkdown(md, slug),
      description: "",
      content,
      video: parseVideoMetadata(frontmatter),
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
    const data = readYamlFile<{ id?: string; title?: string; description?: string; content?: string; video?: { provider?: string; id?: string; poster?: string; duration?: number; captions?: string } }>(lessonYamlPath);
    return {
      id: data.id ?? lessonSlug,
      slug: lessonSlug,
      title: data.title ?? lessonSlug,
      description: data.description ?? "",
      content: data.content ?? "",
      video: parseVideoMetadata(data),
    };
  }

  // B) Markdown-file: <module>/<lessonSlug>.md
  const mdPath = path.join(contentRoot, trackSlug, moduleSlug, `${lessonSlug}.md`);
  if (fs.existsSync(mdPath)) {
    const md = safeReadFile(mdPath);
    const { frontmatter, content } = parseFrontmatter(md);
    return {
      id: lessonSlug,
      slug: lessonSlug,
      title: titleFromMarkdown(md, lessonSlug),
      description: "",
      content,
      video: parseVideoMetadata(frontmatter),
    };
  }

  return null;
}

export function getCaseStudiesForModule(trackSlug: string, moduleSlug: string): CaseStudy[] {
  if (!trackSlug || !moduleSlug) {
    throw new Error("getCaseStudiesForModule: trackSlug and moduleSlug are required");
  }

  const moduleDir = path.join(contentRoot, trackSlug, moduleSlug);
  const moduleYamlPath = path.join(moduleDir, "module.yaml");

  if (!fs.existsSync(moduleYamlPath)) return [];

  const moduleData = readYamlFile<{ case_studies?: string[] }>(moduleYamlPath);
  const caseStudySlugs = moduleData.case_studies ?? [];

  const caseStudies: CaseStudy[] = [];

  for (const slug of caseStudySlugs) {
    const mdPath = path.join(moduleDir, `${slug}.md`);
    if (fs.existsSync(mdPath)) {
      const md = safeReadFile(mdPath);
      const { frontmatter } = parseFrontmatter(md);

      caseStudies.push({
        slug,
        title: (frontmatter.title as string) ?? titleFromMarkdown(md, slug),
        subtitle: frontmatter.subtitle as string | undefined,
      });
    }
  }

  return caseStudies;
}

export function getCaseStudyBySlug(
  trackSlug: string,
  moduleSlug: string,
  caseStudySlug: string
): CaseStudy | null {
  if (!trackSlug || !moduleSlug || !caseStudySlug) return null;

  const mdPath = path.join(contentRoot, trackSlug, moduleSlug, `${caseStudySlug}.md`);

  if (!fs.existsSync(mdPath)) return null;

  const md = safeReadFile(mdPath);
  const { frontmatter, content } = parseFrontmatter(md);

  return {
    slug: caseStudySlug,
    title: (frontmatter.title as string) ?? titleFromMarkdown(md, caseStudySlug),
    subtitle: frontmatter.subtitle as string | undefined,
    content,
  };
}



