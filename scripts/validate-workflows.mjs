// Validates workflows/*.json: parses, has nodes, no credential secrets, docs exist.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dir = join(root, "workflows");
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
let fail = 0;

if (files.length === 0) console.log("no workflows yet (ok for scaffold)");
for (const f of files) {
  const p = join(dir, f);
  try {
    const j = JSON.parse(readFileSync(p, "utf8"));
    if (!j.nodes || !Array.isArray(j.nodes)) { console.error(`FAIL ${f}: missing nodes[]`); fail++; }
    const raw = readFileSync(p, "utf8");
    if (/api[_-]?key|bearer|password/i.test(raw) && /[A-Za-z0-9]{20,}/.test(raw)) {
      console.error(`WARN ${f}: possible secret value — strip credentials`);
    }
    const slug = basename(f, ".json");
    if (!existsSync(join(root, "docs/workflows", `${slug}.md`))) {
      console.error(`FAIL ${f}: missing docs/workflows/${slug}.md`); fail++;
    } else console.log(`ok ${f}`);
  } catch (e) { console.error(`FAIL ${f}: invalid JSON: ${e.message}`); fail++; }
}
process.exit(fail ? 1 : 0);
