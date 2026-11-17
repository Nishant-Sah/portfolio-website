import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Search and answer-engine crawlers: allowed, so your pages can be found and cited.
const DISCOVERY = ["Googlebot", "Bingbot", "DuckDuckBot", "OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"];
// User-triggered fetchers (a person asked an assistant to read your page): allowed.
const USER_FETCH = ["ChatGPT-User", "Claude-User", "Perplexity-User"];
// Model-training crawlers: blocked by default. Remove a name from this list to allow it.
// Google-Extended is intentionally NOT listed: it controls Gemini training AND grounding, so blocking it can reduce Gemini visibility.
const TRAINING = ["GPTBot", "ClaudeBot", "CCBot", "Applebot-Extended", "Bytespider"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: [...DISCOVERY, ...USER_FETCH], allow: "/" },
      { userAgent: TRAINING, disallow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
