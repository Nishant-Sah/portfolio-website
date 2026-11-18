const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
const bad = !url || /localhost|127\.0\.0\.1/.test(url) || !/^https:\/\//.test(url);
if (bad) {
  const msg = "NEXT_PUBLIC_SITE_URL must be your real https:// domain. It is used for canonical URLs, the sitemap, robots.txt and structured data.";
  if (process.env.VERCEL) {
    console.error("SEO check failed: " + msg);
    process.exit(1);
  }
  console.warn("SEO warning: " + msg);
}
