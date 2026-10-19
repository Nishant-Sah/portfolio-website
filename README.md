# Nishant Sah — Engineering Portfolio

A modern, high-performance portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **React Three Fiber**, and **Motion**.

Live at: `https://your-domain.np` (or Vercel domain)

---

## ⚡ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, Server-Side Generation)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom tokens
- **3D Graphics & Animation**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), and [GSAP](https://greensock.com/gsap/) (GreenSock Standard "No Charge" License for websites/portfolios)
- **UI Motion**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) via `next/font/google` with system fallbacks

---

## 🎭 Hero Wireframe Expansion & Reveal Sequence

The hero section features a cinematic polyhedral wireframe expansion that runs **once per page load**:
1. **Initial (`idle`)**: Only the portrait and slowly rotating polyhedral wireframe grid are visible. Scrolling is locked with `scrollbar-gutter: stable`. The navbar, badges, and remaining sections are hidden.
2. **Expansion (`expanding`)**: Triggered by clicking the portrait or the accessible "Click to enter" button (`Enter` / `Space`). The polyhedral wireframe grid smoothly expands across the viewport (1.2s, `power3.inOut`) as the portfolio content fades in synchronously.
3. **Hold & Contraction (`revealed` → `contracting`)**: The expanded grid holds for 0.4s and then automatically contracts back to its original size around the portrait (1.0s, `power3.inOut`).
4. **Final (`done`)**: Scrolling is unlocked permanently. The grid resumes subtle continuous rotation. Subsequent clicks do not trigger the sequence again.
- **Accessibility & Fallback**: Deep links (e.g. `/#projects`) and `prefers-reduced-motion` skip directly to `done`. If WebGL is unavailable, the CSS fallback reveals the portfolio immediately.


## 🚀 Getting Started

### Prerequisites

- Node.js **20.9+** (or latest LTS)
- npm, pnpm, or yarn

### Installation & Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### Quality Verification Scripts

```bash
# Typecheck TypeScript files
npm run typecheck

# Lint with ESLint 9
npm run lint

# Production build with Turbopack (SSG static route generation)
npm run build
```

---

## 📁 Project Structure

```
Portfolio/
├── public/                 # Static assets
│   ├── images/             # Profile portraits & compressed assets
│   └── resume.pdf          # Optional resume download
├── src/
│   ├── app/                # Next.js App Router pages & metadata
│   │   ├── experience/     # Dynamic experience / award detail routes
│   │   ├── projects/       # Dynamic project detail routes
│   │   ├── globals.css     # Global styles, color tokens & reduced-motion rules
│   │   ├── icon.svg        # Scalable SVG favicon
│   │   ├── layout.tsx      # Root HTML layout with Inter font & accessibility landmarks
│   │   ├── not-found.tsx   # Custom branded 404 page
│   │   ├── page.tsx        # Main single-page portfolio
│   │   ├── robots.ts       # Dynamic robots.txt
│   │   └── sitemap.ts      # Dynamic sitemap.xml
│   ├── components/         # Reusable UI & 3D components
│   │   ├── ContactForm.tsx # Accessible contact form with mailto / Formspree support
│   │   ├── CursorFollower.tsx # Responsive mouse & touch follower
│   │   ├── HeroScene.tsx   # 3D interactive polyhedral wireframe scene
│   │   ├── Navbar.tsx      # Sticky header with accessible mobile drawer
│   │   ├── PhotoFloat.tsx  # Interactive parallax portrait
│   │   └── ProjectCard.tsx # Standardized project card with GitHub & demo links
│   ├── data/               # Centralized data content
│   │   ├── experience.ts   # Competitions, workshops & certificates
│   │   ├── projects.ts     # Robotics, IoT & web projects
│   │   ├── site.ts         # Personal details, social links & metadata
│   │   └── skills.ts       # Categorized technical skills
│   └── lib/                # Utility hooks (media queries, WebGL detection)
├── .env.example            # Sample environment variables
├── .gitignore              # Complete Git ignore specifications
├── LICENSE                 # MIT License
└── package.json            # Project dependencies & npm scripts
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` to configure local variables:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap, Open Graph, and SEO | `http://localhost:3000` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Optional [Formspree](https://formspree.io/) submission URL. If left empty, form opens the user's email client directly. | *Empty* |

---

## 🌐 Deployment to Vercel with a `.np` Domain

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Nishant-Sah/<repo-name>.git
   git push -u origin main
   ```
2. **Deploy on Vercel**:
   - Log in to [vercel.com](https://vercel.com) and click **Add New Project**.
   - Import your GitHub repository. Next.js settings will be detected automatically.
   - Click **Deploy**.
3. **Configure Environment Variables**:
   - In Vercel Project Settings → **Environment Variables**, add:
     - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.np`
     - `NEXT_PUBLIC_FORM_ENDPOINT`: `https://formspree.io/f/your-id` (if using Formspree)
4. **Connect `.np` Domain**:
   - In Vercel Settings → **Domains**, enter your domain (e.g. `nishantsah.com.np`).
   - Copy the DNS records provided by Vercel (CNAME for `www` and `A` record for the apex).
   - Log into the Mercantile Communications portal ([register.com.np](https://register.com.np)) and update your Primary/Secondary DNS or name servers.
   - Once DNS propagates, Vercel will automatically provision a free SSL certificate.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
