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

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Access-Code");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Access gate: when ACCESS_CODES is set, every generation must carry a valid code.
  if (gateEnabled() && !isValidCode(req.headers["x-access-code"])) {
    return res.status(401).json({ error: "Access code missing or no longer active." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "API key not configured. Add ANTHROPIC_API_KEY to your Vercel environment variables.",
    });
  }

  const { prompt, maxTokens } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens || 1200,
        temperature: 1,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errData?.error?.message || `Anthropic API error ${response.status}`,
      });
    }

    const data = await response.json();
    const text = data.content?.map((b) => b.text || "").join("") || "";

    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unknown server error" });
  }
}
