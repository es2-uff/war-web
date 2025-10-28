#!/usr/bin/env node
// Generate an adjacency scaffold (JSON) from public/world.svg by extracting path IDs
// Usage: node scripts/generate-adjacency.mjs

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const SVG_PATH = resolve(ROOT, 'public/world.svg');
const OUT_PATH = resolve(ROOT, 'src/data/warAdjacency.json');

function extractPathIds(svgText) {
  const ids = new Set();
  const pathIdRegex = /<path[^>]*\sid="([^"]+)"/g; // capture id from <path ... id="..."
  let match;
  while ((match = pathIdRegex.exec(svgText)) !== null) {
    const id = match[1].trim();
    if (id) ids.add(id);
  }
  return Array.from(ids);
}

function main() {
  const svg = readFileSync(SVG_PATH, 'utf8');
  const ids = extractPathIds(svg).sort((a, b) => a.localeCompare(b));
  if (ids.length === 0) {
    console.error('No <path id="..."> elements found in public/world.svg.');
    process.exit(1);
  }

  // Ensure output dir exists
  const outDir = dirname(OUT_PATH);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  let existing = {};
  if (existsSync(OUT_PATH)) {
    try {
      existing = JSON.parse(readFileSync(OUT_PATH, 'utf8')) || {};
    } catch (_) {
      existing = {};
    }
  }

  // Merge: keep any existing adjacency entries, add missing ids with empty arrays, drop ids no longer present
  const merged = {};
  for (const id of ids) {
    const current = Array.isArray(existing[id]) ? existing[id] : [];
    // Filter out neighbors that no longer exist and dedupe
    const cleaned = Array.from(new Set(current.filter((n) => ids.includes(n) && n !== id)));
    merged[id] = cleaned;
  }

  writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2) + '\n');
  console.log(`Adjacency scaffold written to ${OUT_PATH} with ${ids.length} territories.`);
}

main();
