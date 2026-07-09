export type BotName = "chatgpt" | "claude" | "perplexity" | "gemini" | "deepseek" | "other";

// Known AI crawler/bot user-agent substrings. Most AI crawlers don't execute
// JavaScript, so they never show up in client-side web analytics — this is
// what /api/track/bot (server-side) matches against instead.
const BOT_PATTERNS: { name: BotName; patterns: RegExp[] }[] = [
  { name: "chatgpt", patterns: [/GPTBot/i, /ChatGPT-User/i, /OAI-SearchBot/i] },
  { name: "claude", patterns: [/ClaudeBot/i, /Claude-Web/i, /anthropic-ai/i] },
  { name: "perplexity", patterns: [/PerplexityBot/i, /Perplexity-User/i] },
  { name: "gemini", patterns: [/Google-Extended/i] },
  { name: "deepseek", patterns: [/DeepSeekBot/i] },
  {
    name: "other",
    patterns: [/CCBot/i, /Bytespider/i, /Amazonbot/i, /Applebot-Extended/i, /cohere-ai/i, /Diffbot/i, /YouBot/i, /Meta-ExternalAgent/i, /Timpibot/i, /ImagesiftBot/i],
  },
];

// Returns the matched bot's name, or null if the user-agent isn't a
// recognized AI crawler — callers should not store anything for null
// (this endpoint only tracks AI bots, not regular human/other traffic).
export function detectBot(userAgent: string | null | undefined): BotName | null {
  if (!userAgent) return null;
  for (const { name, patterns } of BOT_PATTERNS) {
    if (patterns.some((p) => p.test(userAgent))) return name;
  }
  return null;
}
