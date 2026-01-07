const fs = require("fs");
const path = require("path");

const root = path.resolve("..", "content", "advanced-private-equity-associate");

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((x) => {
    const p = path.join(d, x.name);
    return x.isDirectory() ? walk(p) : [p];
  });
}

const files = walk(root).filter((p) => p.endsWith(".md"));

// Common UTF-8 read as Windows-1252 mojibake sequences.
// Use literal strings here (not escapes) since they're inside a file, not a shell string.
const reps = [
  ["â€œ", '"'],
  ["â€", '"'],
  ["â€˜", "'"],
  ["â€™", "'"],
  ["â€“", "-"],
  ["â€”", "--"],
];

let n = 0;

for (const f of files) {
  let t = fs.readFileSync(f, "utf8");
  const orig = t;

  for (const [a, b] of reps) t = t.split(a).join(b);

  if (t !== orig) {
    fs.writeFileSync(f, t, "utf8");
    n++;
  }
}

console.log("OK: normalized", n, "files");
