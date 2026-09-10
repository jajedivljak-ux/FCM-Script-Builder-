export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured. Please add ANTHROPIC_API_KEY to your Vercel environment variables.' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errorData?.error?.message || `Anthropic API error: ${response.status}`,
      });
    }

    const data = await response.json();
    const text = data.content?.map((b) => b.text || '').join('') || '';

    if (!text) {
      return res.status(500).json({ error: 'Empty response from API. Please try again.' });
    }

    return res.status(200).json({ script: text });
  } catch (err) {
    console.error('API route error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
