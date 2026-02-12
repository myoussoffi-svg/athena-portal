import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cwd = process.cwd();

  const localPath = path.resolve(cwd, 'content');
  const parentPath = path.resolve(cwd, '../content');

  const localExists = fs.existsSync(localPath);
  const parentExists = fs.existsSync(parentPath);

  let contentRoot = localExists ? localPath : parentPath;
  let lessonPath = '';
  let lessonContent = '';
  let frontmatter = '';

  try {
    lessonPath = path.join(contentRoot, 'investment-banking-interview-prep/04-lbos-advanced-topics/01-lbo-overview-and-intuition.md');
    if (fs.existsSync(lessonPath)) {
      const content = fs.readFileSync(lessonPath, 'utf8');
      // Get first 500 chars to see frontmatter
      lessonContent = content.substring(0, 500);

      // Extract frontmatter
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (match) {
        frontmatter = match[1];
      }
    } else {
      lessonContent = 'FILE NOT FOUND';
    }
  } catch (e) {
    lessonContent = `ERROR: ${e}`;
  }

  // List files in content root
  let contentFiles: string[] = [];
  try {
    if (fs.existsSync(contentRoot)) {
      contentFiles = fs.readdirSync(contentRoot);
    }
  } catch (e) {
    contentFiles = [`ERROR: ${e}`];
  }

  return NextResponse.json({
    cwd,
    localPath,
    localExists,
    parentPath,
    parentExists,
    contentRoot,
    contentFiles,
    lessonPath,
    frontmatter,
    lessonContentPreview: lessonContent,
  });
}
