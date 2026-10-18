// Saved work for the Ad Script Builder: audience profiles, scripts, drafts and
// content ideas, stored per access code in the project's Vercel Blob store
// (BLOB_READ_WRITE_TOKEN is added automatically when the store is connected).
//
// Identity is the access code. A code whose label is "jake" or "admin" (in the
// ACCESS_CODES setting) is a coach and can read every client's saved work.
//
// GET  /api/library            -> { me: {label, admin}, doc }
// PUT  /api/library  {doc}     -> { ok, savedAt }
// GET  /api/library?clients=1  -> admin only: [{ label, codeTail, doc }]
// GET  /api/library?diag=1     -> no auth, storage health only (no data)

import { createHash } from "crypto";
import fs from "fs";
import path from "path";

const BLOB = "https://blob.vercel-storage.com";
const API_VERSION = "7";

// ── access codes (same rules as generate.js and check-code.js) ──
function normalizeCode(raw) {
  return String(raw || "").toUpperCase().replace(/[^A-Z0-9-]/g, "");
}
function codeTable() {
  const out = [];
  for (const entry of (process.env.ACCESS_CODES || "").split(/[,\n]/)) {
    const [c, label] = entry.split(":");
    const code = normalizeCode(c);
    if (code) out.push({ code, label: (label || "").trim() || code.slice(-4) });
  }
  return out;
}
function lookup(raw) {
  const code = normalizeCode(raw);
  return codeTable().find((e) => e.code === code) || null;
}
function isAdmin(entry) {
  const l = (entry.label || "").toLowerCase();
  return l === "jake" || l === "admin" || l.startsWith("admin");
}
function idFor(code) {
  return createHash("sha256").update("fcm-library:" + code).digest("hex").slice(0, 24);
}

// ── storage: Vercel Blob by default, a local folder when LIBRARY_DIR is set (tests) ──
const token = process.env.BLOB_READ_WRITE_TOKEN || "";
const localDir = process.env.LIBRARY_DIR || "";

async function blobList(prefix) {
  const r = await fetch(`${BLOB}/?prefix=${encodeURIComponent(prefix)}&limit=1000`, {
    headers: { authorization: `Bearer ${token}`, "x-api-version": API_VERSION },
  });
  if (!r.ok) throw new Error(`blob list ${r.status}`);
  const data = await r.json();
  return data.blobs || [];
}
let readStrategy = "";
async function blobRead(url) {
  // Private stores: the SDK reads through the API with the token. Try the known
  // routes in order and remember which one works for this process.
  const attempts = [
    ["get-endpoint", () => fetch(`${BLOB}/get?url=${encodeURIComponent(url)}`, { headers: { authorization: `Bearer ${token}`, "x-api-version": API_VERSION }, cache: "no-store" })],
    ["url-with-token", () => fetch(url, { headers: { authorization: `Bearer ${token}`, "x-api-version": API_VERSION }, cache: "no-store" })],
    ["url-public", () => fetch(url, { cache: "no-store" })],
  ];
  const order = readStrategy ? attempts.filter(a => a[0] === readStrategy).concat(attempts.filter(a => a[0] !== readStrategy)) : attempts;
  let lastStatus = 0;
  for (const [name, go] of order) {
    try {
      const r = await go();
      if (r.ok) { readStrategy = name; return r.text(); }
      lastStatus = r.status;
    } catch (e) { lastStatus = -1; }
  }
  throw new Error(`blob read ${lastStatus}`);
}
async function blobWrite(pathname, body) {
  const r = await fetch(`${BLOB}/${pathname}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "x-api-version": API_VERSION,
      "x-content-type": "application/json",
      "x-add-random-suffix": "0",
      "x-allow-overwrite": "1",
      "x-cache-control-max-age": "0",
      "x-access": "private",
    },
    body,
  });
  if (!r.ok) throw new Error(`blob write ${r.status}: ${await r.text().catch(() => "")}`);
  return r.json();
}
async function blobDelete(urls) {
  if (!urls.length) return;
  await fetch(`${BLOB}/delete`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "x-api-version": API_VERSION, "content-type": "application/json" },
    body: JSON.stringify({ urls }),
  }).catch(() => {});
}

const emptyDoc = () => ({ profiles: [], scripts: [], draft: null, content: null, updatedAt: null });

async function readDoc(id) {
  if (localDir) {
    const f = path.join(localDir, id + ".json");
    return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : emptyDoc();
  }
  const blobs = await blobList(`library/${id}/doc-`);
  if (!blobs.length) return emptyDoc();
  blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1)); // newest timestamp first
  try {
    return JSON.parse(await blobRead(blobs[0].url));
  } catch (e) {
    return emptyDoc();
  }
}

async function writeDoc(id, doc) {
  doc.updatedAt = new Date().toISOString();
  const body = JSON.stringify(doc);
  if (localDir) {
    fs.mkdirSync(localDir, { recursive: true });
    fs.writeFileSync(path.join(localDir, id + ".json"), body);
    return doc.updatedAt;
  }
  const stamp = String(Date.now()).padStart(14, "0");
  await blobWrite(`library/${id}/doc-${stamp}.json`, body);
  // Keep only the newest copy.
  const blobs = await blobList(`library/${id}/doc-`).catch(() => []);
  blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1));
  await blobDelete(blobs.slice(1).map((b) => b.url));
  return doc.updatedAt;
}

async function listIds() {
  if (localDir) {
    if (!fs.existsSync(localDir)) return [];
    return fs.readdirSync(localDir).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));
  }
  const blobs = await blobList("library/");
  return [...new Set(blobs.map((b) => b.pathname.split("/")[1]).filter(Boolean))];
}

function sanitizeDoc(input) {
  const d = emptyDoc();
  if (!input || typeof input !== "object") return d;
  d.profiles = Array.isArray(input.profiles) ? input.profiles.slice(0, 50) : [];
  d.scripts = Array.isArray(input.scripts) ? input.scripts.slice(0, 500) : [];
  d.draft = input.draft && typeof input.draft === "object" ? input.draft : null;
  d.content = input.content && typeof input.content === "object" ? input.content : null;
  return d;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.query.diag === "1") {
    // Storage health only. Never returns stored data.
    const out = { storage: localDir ? "local" : token ? "blob" : "none", write: false, read: false, cleanup: false };
    if (!localDir && !token) return res.status(200).json(out);
    try {
      const id = "diag";
      const stamp = String(Date.now());
      await writeDoc(id, { ping: stamp, profiles: [], scripts: [] });
      out.write = true;
      const back = await readDoc(id);
      out.read = back && back.ping === stamp;
      out.readStrategy = readStrategy;
      if (!localDir) {
        const blobs = await blobList(`library/${id}/`);
        await blobDelete(blobs.map((b) => b.url));
        out.cleanup = true;
      }
    } catch (e) {
      out.error = String(e.message || e).slice(0, 200);
    }
    return res.status(200).json(out);
  }

  const me = lookup(req.headers["x-access-code"]);
  if (!me) return res.status(401).json({ error: "Access code missing or no longer active." });
  if (!localDir && !token) return res.status(500).json({ error: "Storage is not configured on the server." });

  try {
    if (req.method === "GET" && req.query.clients === "1") {
      if (!isAdmin(me)) return res.status(403).json({ error: "Coach access only." });
      const table = codeTable();
      const ids = await listIds();
      const clients = [];
      for (const entry of table) {
        const id = idFor(entry.code);
        if (!ids.includes(id)) { clients.push({ label: entry.label, codeTail: entry.code.slice(-4), admin: isAdmin(entry), doc: emptyDoc() }); continue; }
        const doc = await readDoc(id);
        clients.push({ label: entry.label, codeTail: entry.code.slice(-4), admin: isAdmin(entry), doc: { profiles: doc.profiles || [], scripts: doc.scripts || [], updatedAt: doc.updatedAt || null } });
      }
      return res.status(200).json({ clients });
    }

    const id = idFor(me.code);

    if (req.method === "GET") {
      const doc = await readDoc(id);
      return res.status(200).json({ me: { label: me.label, admin: isAdmin(me) }, doc });
    }

    if (req.method === "PUT") {
      const doc = sanitizeDoc((req.body || {}).doc);
      const savedAt = await writeDoc(id, doc);
      return res.status(200).json({ ok: true, savedAt });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Storage error" });
  }
}

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };
