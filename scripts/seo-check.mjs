// Usage: node scripts/seo-check.mjs https://nishantsah7.com.np [--ignore-origin]
const base = (process.argv[2] ?? "").replace(/\/$/, "");
const ignoreOrigin = process.argv.includes("--ignore-origin");
if (!base) { console.error("Usage: node scripts/seo-check.mjs <site-url> [--ignore-origin]"); process.exit(2); }
let fails = 0, warns = 0;
const bad = (m) => { fails++; console.log("  FAIL  " + m); };
const warn = (m) => { warns++; console.log("  warn  " + m); };
const ok = (m) => console.log("  ok    " + m);
const get = async (u) => { const r = await fetch(u, { redirect: "manual" }); return { r, t: await r.text() }; };
const path = (u) => new URL(u).pathname;

console.log("robots.txt");
const robots = await get(base + "/robots.txt");
robots.r.status === 200 ? ok("200") : bad("status " + robots.r.status);
/sitemap:/i.test(robots.t) ? ok("lists a sitemap") : bad("no Sitemap line");
console.log("sitemap.xml");
const sm = await get(base + "/sitemap.xml");
sm.r.status === 200 ? ok("200") : bad("status " + sm.r.status);
const locs = [...sm.t.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
locs.length ? ok(locs.length + " URLs") : bad("no URLs");

for (const loc of locs) {
  const url = base + path(loc);
  console.log(path(loc) || "/");
  const { r, t } = await get(url);
  if (r.status !== 200) { bad("status " + r.status); continue; }
  const title = (t.match(/<title>(.*?)<\/title>/s) ?? [])[1] ?? "";
  title ? (title.length > 65 ? warn(`title ${title.length} chars: ${title}`) : ok(`title: ${title}`)) : bad("missing <title>");
  if ((title.match(/\| Nishant Sah/g) ?? []).length > 1) bad("site name repeated in title");
  const desc = (t.match(/<meta name="description" content="(.*?)"/s) ?? [])[1] ?? "";
  desc ? (desc.length < 50 || desc.length > 170 ? warn(`description ${desc.length} chars`) : ok("description " + desc.length + " chars")) : bad("missing meta description");
  const canon = [...t.matchAll(/<link rel="canonical" href="(.*?)"/g)].map((m) => m[1]);
  if (canon.length !== 1) bad("canonical tags: " + canon.length);
  else (ignoreOrigin ? path(canon[0]) === path(loc) : canon[0] === loc) ? ok("canonical " + canon[0]) : bad(`canonical points to ${canon[0]}`);
  /property="og:image"/.test(t) ? ok("og:image") : bad("missing og:image");
  /name="twitter:card"/.test(t) ? ok("twitter card") : warn("missing twitter card");
  const ld = [...t.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (!ld.length) warn("no JSON-LD");
  for (const m of ld) { try { JSON.parse(m[1]); ok("JSON-LD parses"); } catch { bad("invalid JSON-LD"); } }
  const noAlt = [...t.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)].length;
  noAlt ? warn(noAlt + " image(s) without alt") : ok("all images have alt");
}
console.log(`\n${fails} failed, ${warns} warnings`);
process.exit(fails ? 1 : 0);
