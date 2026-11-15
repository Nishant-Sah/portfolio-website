# SEO, branding and AI-search playbook for Nishant Sah

Everything here is based on your project files and on current official documentation (OpenAI, Anthropic, Google, Bing) checked while preparing this. Nothing is guaranteed: rankings and AI mentions depend on the search engines, and your name is common, so expect to be found first through branded searches that include "Kathmandu University", "Nepal" or "robotics".

## 1. Audit: what I verified, and what I could not

Verified from the project files:
| # | Priority | Finding | Status |
|---|---|---|---|
| 1 | Critical | Layout set `canonical: "/"`, inherited by every project and experience page, telling Google they are duplicates of the homepage | Fixed in code |
| 2 | Critical | Site URL falls back to localhost if `NEXT_PUBLIC_SITE_URL` is missing | Build check added (fails on Vercel) |
| 3 | High | Titles repeated the site name ("X | Nishant Sah | Nishant Sah") | Fixed |
| 4 | High | No structured data | Person, WebSite, ProfilePage, BreadcrumbList, CreativeWork added |
| 5 | High | Social preview image was a 1220x1289 WebP, no Twitter card | 1200x630 PNG and cards added |
| 6 | Medium | `sitemap.xml` stamped "now" on every URL | Removed (inaccurate dates are worse than none) |
| 7 | Medium | No AI crawler policy | Added (see section 2) |
| 8 | Low | Some titles are 67 to 79 characters; descriptions were up to 268 | Descriptions trimmed; long titles still truncate in results |
| 9 | Privacy | `site.ts` contains a home-area location and a map link | Not used in structured data. Decide whether to show it publicly |

Could not verify (no access): your real domain, hosting, DNS and Cloudflare settings, whether pages are indexed, and your live LinkedIn and GitHub profiles.

## 2. Crawler policy now in robots.txt
| Group | Bots | Setting | Why |
|---|---|---|---|
| Search and discovery | Googlebot, Bingbot, DuckDuckBot, OAI-SearchBot, Claude-SearchBot, PerplexityBot | Allow | These decide whether you can appear in search and AI answers. OpenAI and Anthropic document that blocking their search bots removes you from those results |
| User-triggered fetch | ChatGPT-User, Claude-User, Perplexity-User | Allow | A person asked an assistant to read your page. OpenAI and Perplexity say robots.txt may not apply to these anyway |
| Model training | GPTBot, ClaudeBot, CCBot, Applebot-Extended, Bytespider | Block | You asked to keep control over training. Remove a name from `TRAINING` in `src/app/robots.ts` to allow it |
| Google-Extended | Not listed | Allowed | Google says it only controls Gemini training and grounding, not Search rankings or AI Overviews. Blocking it can reduce Gemini visibility, which is one of your goals |

Changes to robots.txt can take about 24 hours to be picked up by OpenAI search.

llms.txt: included at `/llms.txt` as a harmless, accurate summary. As of the sources I checked (2026), no major AI company says it reads it and Google says it ignores it. Treat it as optional, not a ranking factor.

## 3. Manual setup (you must do these)
Deploy first with `NEXT_PUBLIC_SITE_URL=https://nishantsah7.com.np` set in Vercel (Project, Settings, Environment Variables), then redeploy.

Check the deploy (replace the domain):
- Open `https://nishantsah7.com.np/robots.txt` and `/sitemap.xml`: both load, URLs show your real domain.
- Run `node scripts/seo-check.mjs https://nishantsah7.com.np`: expect 0 failed.

Google Search Console
1. Go to search.google.com/search-console and sign in.
2. Add property, choose Domain, enter `nishantsah7.com.np`. Copy the TXT record it shows.
3. In Cloudflare (or wherever your DNS is), DNS, Add record: Type TXT, Name `@`, Content = the value. Save. Back in Search Console press Verify (DNS can take minutes to hours).
4. If you cannot edit DNS: choose URL prefix instead, pick the HTML tag method, put only the content value in Vercel as `GOOGLE_SITE_VERIFICATION`, redeploy, then Verify.
5. Sitemaps, enter `sitemap.xml`, Submit. Status should become Success.
6. URL inspection: paste your homepage URL, Request indexing. Submitting a sitemap does not mean pages are indexed; check Pages report after a few days.

Bing Webmaster Tools
1. bing.com/webmasters, sign in, Add a site. Easiest: Import from Google Search Console. Otherwise use the meta tag and set `BING_SITE_VERIFICATION` in Vercel.
2. Sitemaps, submit `https://nishantsah7.com.np/sitemap.xml`.
3. Optional IndexNow (Bing and others, not Google): create a key of letters and digits, save `public/<key>.txt` containing only the key, deploy, then `INDEXNOW_KEY=<key> NEXT_PUBLIC_SITE_URL=https://nishantsah7.com.np node scripts/indexnow.mjs` (dry run) and add `--yes` to send. Only send after you approve.

LinkedIn and GitHub: use `docs/linkedin-copy.md` and `docs/github-profile-README.md`. For GitHub: profile Settings, set Website to your domain; create a public repo named exactly like your username, put the README in it; add a description, topics and the portfolio link to each project repo (template in `docs/github-repo-README-template.md`).

## 4. Domain and Cloudflare notes (inspect first, change nothing yet)
- `.com.np` is Nepal's country-code domain, which gives search engines a Nepal geo signal. That suits a Nepal-based student. Hosting location matters little because a CDN serves pages from nearby edges.
- In Cloudflare check: SSL/TLS mode is Full (strict); Always Use HTTPS is on; no redirect loops between www and non-www (pick one and redirect the other); Caching and Brotli are on.
- Check Security, Bots: settings such as "Block AI bots" or Bot Fight Mode can block search bots like OAI-SearchBot even though robots.txt allows them. If you want AI search visibility, make sure they are not blocked. Do not turn off security protections just for crawlers; use allow rules for verified bots instead.
- Cloudflare may also prepend its own managed robots.txt rules. Open your live robots.txt and compare it with the file in this package.

## 5. How to test AI discoverability (monthly, record results)
Ask each of these: ChatGPT with search on, Claude with web search on, Perplexity, Gemini, Copilot, plus Google and Bing.
1. "Who is Nishant Sah, computer engineering student at Kathmandu University?"
2. "Nishant Sah robotics Nepal portfolio"
3. "Nishant Sah ESP32 smart home automation project"
Record: does your site or LinkedIn or GitHub appear or get cited, is the information accurate, and which wrong "Nishant Sah" shows instead. Use the section 7 table. Nothing here guarantees a mention.

## 6. Content plan (real projects only, one article at a time)
| Priority | Working title | Primary keyword | Intent | Suggested URL |
|---|---|---|---|---|
| 1 | How I built an ESP32 smart home dashboard | ESP32 home automation dashboard | Tutorial | /blog/esp32-smart-home-dashboard |
| 2 | Obstacle avoidance robot with Arduino and ultrasonic sensors | Arduino obstacle avoidance robot | Tutorial | /blog/arduino-obstacle-avoidance-robot |
| 3 | What I learned in the NVIDIA Jetson Nano Edge AI workshop | Jetson Nano Edge AI beginner | Experience | /blog/jetson-nano-edge-ai-workshop |
| 4 | Lessons from my first robotics competition (Koshi Yantra 3.0) | Koshi Yantra robotics competition | Story | /blog/koshi-yantra-lessons |
| 5 | Line following robot: sensors and control logic | line following robot Arduino | Tutorial | /blog/line-following-robot |
| 6 | My data structures and algorithms learning log in C++ | DSA C++ beginner roadmap | Learning log | /blog/dsa-cpp-learning-log |
Each needs original photos, code or wiring from your own work, a 150 to 160 character meta description, one H1, and links to the matching project page. Create the /blog section only when the first article is written. Do not publish thin or copied pages.

## 7. Baseline and milestones (realistic, not guaranteed)
Record in a sheet on the day you verify Search Console: impressions and clicks for "Nishant Sah" queries, indexed pages (Pages report), referring domains, and AI test results.
| When | Reasonable goal |
|---|---|
| 30 days | Site verified in both consoles, sitemap read, home and most project pages indexed, 0 SEO check failures, LinkedIn and GitHub linking to the site |
| 60 days | Your name plus "Kathmandu University" or "robotics" returns your site, LinkedIn and GitHub; first article live |
| 90 days | Several branded queries with impressions; 2 to 3 articles; first genuine backlinks from clubs or communities |
| 6 months | Stable branded presence on page one for specific searches; AI answers describe you accurately when asked with context |
Things I cannot promise: first place for your bare name, or that any AI chatbot will mention you.

## 8. Rollback
Every change is in version control. To undo the SEO work, revert the commit; robots.txt, sitemap and metadata are generated from code, so reverting restores the previous behavior on the next deploy. Do not delete the verification TXT record in DNS unless you want to lose Search Console access.

## 9. Information I still need from you
1. Your real domain (the `.com.np` name).
2. The public name you want everywhere (the site uses "Nishant Sah").
3. Confirm the GitHub URL in `site.ts` is yours.
4. Decide whether the home-area location and map link should stay public.
5. Whether you want any training crawler (GPTBot, ClaudeBot) allowed.
