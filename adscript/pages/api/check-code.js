// Access codes live in the ACCESS_CODES environment variable on Vercel,
// comma separated, e.g. "FCM-1234-ABCD-5678:sarah, FCM-9999-ZZZZ-0000:marcus".
// The label after the colon is ignored by the check; it is there for you.
// If the variable is empty or missing, the tool is open to anyone (no gate).
function normalizeCode(raw) {
  return String(raw || "").toUpperCase().replace(/[^A-Z0-9-]/g, "");
}
function activeCodes() {
  return (process.env.ACCESS_CODES || "")
    .split(/[,\n]/)
    .map((s) => s.split(":")[0])
    .map(normalizeCode)
    .filter(Boolean);
}
function gateEnabled() { return activeCodes().length > 0; }
function isValidCode(raw) {
  const code = normalizeCode(raw);
  return !!code && activeCodes().includes(code);
}

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (!gateEnabled()) {
    // No codes configured: the tool is open. Accept anything non-empty.
    return res.status(200).json({ ok: true, open: true });
  }
  const { code } = req.body || {};
  if (isValidCode(code)) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: "That code isn't active. Check it and try again, or ask your coach for a new one." });
}
