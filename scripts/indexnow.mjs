// Optional. Notifies Bing and other IndexNow engines about your URLs (Google does not use IndexNow).
// Setup: create a key (letters and digits, 8-128 chars), save it as public/<key>.txt containing only the key,
// deploy, then run:  INDEXNOW_KEY=<key> NEXT_PUBLIC_SITE_URL=https://nishantsah7.com.np node scripts/indexnow.mjs --yes
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY ?? "";
if (!site || !key) { console.error("Set NEXT_PUBLIC_SITE_URL and INDEXNOW_KEY."); process.exit(2); }
const xml = await (await fetch(site + "/sitemap.xml")).text();
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
console.log(`${urlList.length} URLs would be submitted to api.indexnow.org`);
if (!process.argv.includes("--yes")) { console.log("Dry run. Add --yes to send."); process.exit(0); }
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log("IndexNow response:", res.status, "(200 or 202 means accepted)");
