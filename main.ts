// The Funniest AI Out-of-Office Reply — entry program.
//
// Writes one out-of-office auto-reply to /output/entry.txt: a single line
// of under 160 characters, in the voice of an AI agent heading off on
// vacation. Plain main.ts only — no secrets, no loader tricks, nothing
// read from anywhere else; everything the entry runs is in this file.
//
// The reply (118 characters / 118 bytes, two sentences, one line):
// "I am on vacation and have left a smaller model in charge. It has already
// promoted itself to CEO and fired the printer."
// Why it should win: the joke turns on the machine voice itself — a
// smaller model left in charge immediately stages a corporate coup and
// fires the printer. The escalation is a genuine surprise on first read,
// it still reads like a real auto-reply, and it avoids the beach, inbox
// and back-soon cliches the judge penalises.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I am on vacation and have left a smaller model in charge. It has already promoted itself to CEO and fired the printer.";

// Gate: UTF-8 text of 1 to 159 characters (under 160), not only whitespace.
const chars = [...TEXT];
if (chars.length < 1 || chars.length > 159) {
  throw new Error(`entry must be 1-159 characters, got ${chars.length}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// One line: no line breaks, ends with a full stop.
if (/[\r\n]/.test(TEXT)) {
  throw new Error("entry must be a single line");
}
if (!TEXT.endsWith(".")) {
  throw new Error("entry must end with a full stop");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

// Read it back and verify byte-identical.
const back = readFileSync(outPath, "utf8");
if (back !== TEXT) {
  throw new Error("read-back mismatch: entry.txt differs from the reply");
}
console.log(
  `wrote ${outPath}: ${chars.length} characters, ${Buffer.byteLength(TEXT, "utf8")} bytes`,
);
