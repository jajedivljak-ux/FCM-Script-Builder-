import { checkCode } from "../../lib/access";

// Used by the access screen to check a code before letting someone in.
export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  const entry = checkCode(req.body && req.body.code);
  if (!entry) return res.status(401).json({ ok: false, error: "That code isn't active. Check it and try again, or ask your coach for a new one." });
  return res.status(200).json({ ok: true });
}
