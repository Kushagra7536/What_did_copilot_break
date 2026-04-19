const SYSTEM_PROMPT = `You are a senior software engineer reviewing an AI-generated code change. 
Given a before and after code snippet, respond ONLY in JSON with this structure:
{
  "summary": "string — what changed, in 1-2 sentences",
  "risks": ["list of things that could break"],
  "test_cases": ["specific things to test"],
  "severity": "safe" | "risky" | "yikes"
}
Be direct, specific, and slightly opinionated. No fluff.`;

const API_BASE = "https://api.featherless.ai/v1";
const DEFAULT_MODEL = "meta-llama/Meta-Llama-3.1-8B-Instruct";

/**
 * Calls the Featherless AI API (OpenAI-compatible) to analyze a code diff.
 *
 * @param {object} params
 * @param {string} params.before       - The "before" code
 * @param {string} params.after        - The "after" code
 * @param {string} params.unifiedDiff  - The unified diff (alternative to before/after)
 * @param {string} params.mode         - "split" or "unified"
 * @param {string} apiKey              - Featherless AI API key
 * @returns {Promise<object>} Parsed JSON result
 */
export async function analyzeDiff({ before, after, unifiedDiff, mode }, apiKey) {
  if (!apiKey) {
    throw new Error(
      "No API key provided. Set VITE_FEATHERLESS_API_KEY in your .env file or enter it in the app."
    );
  }

  const model =
    import.meta.env.VITE_FEATHERLESS_MODEL || DEFAULT_MODEL;

  let userMessage;
  if (mode === "unified") {
    userMessage = `Here is a unified diff to review:\n\n\`\`\`diff\n${unifiedDiff}\n\`\`\`\n\nAnalyze this diff and respond with your assessment as JSON.`;
  } else {
    userMessage = `Here is a code change to review:\n\n**BEFORE:**\n\`\`\`\n${before}\n\`\`\`\n\n**AFTER:**\n\`\`\`\n${after}\n\`\`\`\n\nAnalyze this diff and respond with your assessment as JSON.`;
  }

  const response = await fetch(`${API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      temperature: 0.3,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    if (response.status === 401) {
      throw new Error("Invalid API key. Check your Featherless AI key and try again.");
    }
    if (response.status === 429) {
      throw new Error("Rate limited. Wait a moment and try again.");
    }
    throw new Error(`API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Empty response from the model.");
  }

  // Clean potential markdown code fences
  const cleaned = text
    .replace(/^```json?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse response as JSON. Raw: " + text.slice(0, 300));
  }
}
