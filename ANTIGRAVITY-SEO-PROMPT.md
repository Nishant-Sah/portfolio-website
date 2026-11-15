# Antigravity prompt: SEO and AI-search setup for the portfolio

Read this whole file first, then implement it in small steps. Do not delete files, do not run destructive git commands, do not deploy, and do not expose secrets. Inspect the repository before changing anything. Preserve all existing design and functionality.

## Context (verified from the repository)
- Next.js App Router, TypeScript, Tailwind. Owner: Nishant Sah, computer engineering student at Kathmandu University.
- Pages: `/` (client component, cannot export metadata), `/projects/[slug]`, `/experience/[slug]`, a 404 page.
- Problems found: (1) the layout set `canonical: "/"`, which child pages inherit, so every project and experience page told search engines to treat the homepage as canonical; (2) project and experience titles already included "| Nishant Sah" while the layout title template adds it again; (3) no structured data; (4) the Open Graph image was a 1220x1289 WebP, not a 1200x630 image, and there was no Twitter card; (5) `sitemap.ts` stamped `new Date()` on every URL; (6) robots.txt had no AI crawler policy; (7) the site URL silently falls back to localhost if `NEXT_PUBLIC_SITE_URL` is missing.

## Step 0: files already added manually (do NOT modify or recreate)
`src/lib/seo.ts`, `src/components/JsonLd.tsx`, `src/components/HomeSeo.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts`, `scripts/check-seo-env.mjs`, `scripts/seo-check.mjs`, `scripts/indexnow.mjs`, `public/og/nishant-sah-og.png`.
If any of them is missing, stop and tell me.

## Step 1: src/app/layout.tsx
- Add `import { OG_IMAGE, siteUrl } from "@/lib/seo";`
- Replace the whole `export const metadata: Metadata = { ... };` (and its preceding description constant stays) with:

```ts
const pageTitle = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: pageTitle, template: `%s | ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { title: pageTitle, description, url: "/", siteName: site.name, type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: pageTitle, description, images: [OG_IMAGE.url] },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};
```
- Do not add `alternates.canonical` to the layout.

## Step 2: src/app/page.tsx (home)
- Add `import HomeSeo from "@/components/HomeSeo";`
- Render `<HomeSeo />` as the first child inside the root `<div id="top" ...>`. It outputs the canonical link and the Person, WebSite and ProfilePage JSON-LD. Change nothing else on this page.

## Step 3: src/app/projects/[slug]/page.tsx
- Add `import JsonLd from "@/components/JsonLd";` and `import { OG_IMAGE, clip, projectGraph } from "@/lib/seo";`
- Replace `generateMetadata` with:

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found", robots: { index: false } };
  const path = `/projects/${slug}`;
  const desc = clip(project.description);

  return {
    title: project.title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { type: "article", title: project.title, description: desc, url: path, siteName: site.name, locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: project.title, description: desc, images: [OG_IMAGE.url] },
  };
}
```
- Render `<JsonLd data={projectGraph(project)} />` as the first child of the page's root element.

## Step 4: src/app/experience/[slug]/page.tsx
- Add `import JsonLd from "@/components/JsonLd";` and `import { OG_IMAGE, clip, experienceGraph } from "@/lib/seo";`
- Replace `generateMetadata` with:

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = experienceData.find((e) => e.slug === slug);
  if (!item) return { title: "Experience Not Found", robots: { index: false } };
  const path = `/experience/${slug}`;
  const desc = clip(item.summary);

  return {
    title: item.title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { type: "article", title: item.title, description: desc, url: path, siteName: site.name, locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: item.title, description: desc, images: [OG_IMAGE.url] },
  };
}
```
- Render `<JsonLd data={experienceGraph(item)} />` as the first child of the root element.

## Step 5: src/app/not-found.tsx
Add `robots: { index: false, follow: false },` to its metadata export.

## Step 6: package.json
Add scripts: `"prebuild": "node scripts/check-seo-env.mjs"` and `"seo:check": "node scripts/seo-check.mjs"`.

## Step 7: .env.example
Append: `NEXT_PUBLIC_SITE_URL=https://nishantsah7.com.np`, `GOOGLE_SITE_VERIFICATION=`, `BING_SITE_VERIFICATION=`. Never commit real values.

## Step 8: verify
Run `npm run typecheck` and `npm run lint` and report only new errors (a pre-existing setState-in-effect lint error in page.tsx is known). Then run `NEXT_PUBLIC_SITE_URL=https://example.com.np npm run build`, start the site, and run `node scripts/seo-check.mjs http://localhost:3000 --ignore-origin`. Report failures. Warnings about long titles are acceptable.

## Rules
Do not change DNS, Cloudflare, GitHub or LinkedIn. Do not deploy. Do not invent facts about me. Report changed files and remaining problems at the end.
