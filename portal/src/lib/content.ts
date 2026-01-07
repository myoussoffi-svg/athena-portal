import fs from "fs";
import path from "path";
import { globSync } from "glob";
import yaml from "js-yaml";

export type ModuleMeta = {
  id: string;
  title: string;
  description: string;
  order: number;
  estimated_hours?: number;
  lessons: string[];
};

const repoRoot = path.resolve(process.cwd(), ".."); // portal/ -> repo root
const contentRoot = path.join(repoRoot, "content");

function readYaml(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return yaml.load(raw) as any;
}

function readText(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

export function getTracks(): { slug: string; title: string }[] {
  const dirs = fs
    .readdirSync(contentRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const titles: Record<string, string> = {
    "investment-banking-interview-prep": "Investment Banking Interview Prep",
    "private-equity-interview-prep": "Private Equity Interview Prep",
    "advanced-private-equity-associate": "Advanced Private Equity Associate",
  };

  return dirs
    .map((slug) => ({ slug, title: titles[slug] ?? slug }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getModulesForTrack(trackSlug: string) {
  const moduleYamlPaths = globSync(
    path.join(contentRoot, trackSlug, "*/module.yaml").replace(/\\/g, "/")
  );

  const modules = moduleYamlPaths.map((p) => {
    const moduleSlug = path.basename(path.dirname(p));
    const meta = readYaml(p) as ModuleMeta;
    return { trackSlug, moduleSlug, meta };
  });

  return modules.sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999));
}

export function getModuleMeta(trackSlug: string, moduleSlug: string) {
  const moduleDir = path.join(contentRoot, trackSlug, moduleSlug);
  return readYaml(path.join(moduleDir, "module.yaml")) as ModuleMeta;
}

export function getLessonSlugs(trackSlug: string, moduleSlug: string) {
  const moduleDir = path.join(contentRoot, trackSlug, moduleSlug);
  const files = fs
    .readdirSync(moduleDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const map: Record<string, string> = {};
  for (const f of files) {
    const noExt = f.replace(/\.md$/, "");
    const m = noExt.match(/^\d{2,3}-(.+)$/);
    const slug = m ? m[1] : noExt;
    map[slug] = path.join(moduleDir, f);
  }
  return map;
}

export function getLesson(trackSlug: string, moduleSlug: string, lessonSlug: string) {
  const map = getLessonSlugs(trackSlug, moduleSlug);
  const filePath = map[lessonSlug];
  if (!filePath) return null;

  const body = readText(filePath);
  const titleMatch = body.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : lessonSlug;

  return { trackSlug, moduleSlug, lessonSlug, title, body };
}
