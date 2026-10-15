import crypto from "crypto";

// Access codes for the tool.
// This repo is public, so only a fingerprint (SHA-256 hash) of each code is stored here, never the code itself.
// Labels stay generic so client names are not public. Keep your own list of who has which label.
// To switch someone off, delete their line and push. The change is live in about a minute.
export const ACCESS_CODES = [
  { label: "owner", hash: "f2a00c0551b5bfbb003af0df78698528b6534a6aa02ba6962a6305a1cddca976" },
];

export function normaliseCode(code) {
  return String(code || "").trim().toUpperCase().replace(/\s+/g, "");
}

export function hashCode(code) {
  return crypto.createHash("sha256").update(normaliseCode(code)).digest("hex");
}

// Returns the matching entry, or null if the code is not active.
export function checkCode(code) {
  const norm = normaliseCode(code);
  if (!norm) return null;
  const h = hashCode(norm);
  return ACCESS_CODES.find(c => c.hash === h) || null;
}
