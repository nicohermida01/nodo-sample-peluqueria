#!/usr/bin/env node
/**
 * Generates a neutral, clearly labeled photo placeholder with real proportions.
 *
 *   node scripts/placeholder.mjs <out.jpg> <aspect> "<label>"
 *   node scripts/placeholder.mjs src/assets/gallery/new-work.jpg 4:5 "balayage, vista posterior"
 *
 * Aspects: 4:5, 3:4, 1:1, 3:2, 16:9. Output is a metadata-free JPEG.
 * Replace placeholders with real photos keeping the same file name and aspect.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SIZES = {
  '4:5': [1200, 1500],
  '3:4': [1200, 1600],
  '1:1': [1200, 1200],
  '3:2': [1500, 1000],
  '16:9': [1920, 1080],
};

// Warm neutrals from the design palette, picked by label so files look distinct.
const TONES = ['#E6DACA', '#DCCDB8', '#D2C1AA', '#E9E1D5'];
const INK = '#6B5F52';

const [out, aspect, label] = process.argv.slice(2);
if (!out || !SIZES[aspect] || !label) {
  console.error('Usage: node scripts/placeholder.mjs <out.jpg> <4:5|3:4|1:1|3:2|16:9> "<label>"');
  process.exit(1);
}

const [w, h] = SIZES[aspect];
const hash = [...label].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const bg = TONES[hash % TONES.length];

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy word wrap by approximate character width. */
function wrap(text, maxChars) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

const fontSize = Math.round(w / 26);
const lines = wrap(label, Math.floor((w * 0.78) / (fontSize * 0.55)));
const lineHeight = fontSize * 1.35;
const blockTop = h / 2 - ((lines.length - 1) * lineHeight) / 2;
const inset = Math.round(w * 0.04);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}"
        fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="2"/>
  <text x="50%" y="${blockTop - lineHeight * 1.4}" text-anchor="middle" fill="${INK}"
        font-family="sans-serif" font-size="${fontSize * 0.7}" letter-spacing="${fontSize * 0.18}"
        font-weight="600">FOTO</text>
  ${lines
    .map(
      (l, i) =>
        `<text x="50%" y="${blockTop + i * lineHeight}" text-anchor="middle" fill="${INK}"
               font-family="sans-serif" font-size="${fontSize}">${escape(l)}</text>`,
    )
    .join('\n  ')}
  <text x="50%" y="${h - inset * 1.8}" text-anchor="middle" fill="${INK}" fill-opacity="0.7"
        font-family="sans-serif" font-size="${fontSize * 0.6}" letter-spacing="${fontSize * 0.1}">${aspect} · ${w}×${h}</text>
</svg>`;

mkdirSync(dirname(out), { recursive: true });
await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
console.log(`✓ ${out} (${aspect})`);
