# Ehtisham Ali — Cybersecurity Portfolio

A light-theme, 3D-interactive personal portfolio built with **React + Vite**, **Tailwind CSS v4**, **Motion (Framer Motion)**, **Three.js / React Three Fiber / Drei** and **Lucide** icons.
All content comes from the CV — no database, no paid APIs.

---

## Quick start

Requires **Node.js 20.19+** (or 22+).

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:5173
npm run build      # production build → /dist
npm run preview    # preview the production build locally
```

Deploy `/dist` to Netlify, Vercel, GitHub Pages or any static host
(Netlify: build command `npm run build`, publish directory `dist`).

---

## Project structure

```
ehtisham-portfolio/
├── index.html                  # SEO, Open Graph, Twitter, JSON-LD, favicons
├── vite.config.js
├── public/
│   ├── Ehtisham-Ali-CV.pdf     # "Download CV" file (generated from your CV image)
│   ├── images/                 # optimized portrait (480/760/1080 webp + jpg fallback)
│   ├── projects/               # ← put project screenshots here
│   ├── og-image.png            # social share preview (1200×630)
│   ├── favicon.svg, favicon-32.png, apple-touch-icon.png, icon-512.png
│   ├── site.webmanifest, robots.txt
└── src/
    ├── main.jsx                # entry + app-level error boundary
    ├── App.jsx                 # page composition
    ├── index.css               # DESIGN SYSTEM — Tailwind v4 theme (@theme) + components
    ├── data/portfolio.js       # ★ ALL CONTENT lives here
    ├── hooks/                  # useActiveSection, useMediaQuery
    └── components/
        ├── layout/             # Navbar, Footer, Background, ScrollProgress/BackToTop
        ├── sections/           # Hero, About, Cybersecurity, Skills, Expertise,
        │                       # Projects, Education, Experience, Contact
        ├── three/              # HeroScene (network globe), VlanScene (VLAN model),
        │                       # Lazy3D (lazy mount, pause off-screen, WebGL fallback)
        └── ui/                 # Button, Reveal, SectionHeading, TiltCard,
                                # TypedText, BrowserMockup, icons
```

### Tailwind configuration
This project uses **Tailwind CSS v4**, which is configured in CSS rather than a
`tailwind.config.js`. The full theme — colors, fonts, shadows and animations — is
in the `@theme { … }` block at the top of `src/index.css`.

| Token | Value | Use |
|---|---|---|
| `canvas` | `#F8FAFC` | main background |
| `mist` | `#EFF6FF` | secondary background |
| `card` | `#FFFFFF` | cards |
| `primary` | `#3764D8` | primary blue |
| `cyan` | `#36B5C5` | accent |
| `lavender` | `#A5A1EB` | accent |
| `ink` | `#24324B` | main text |
| `muted` | `#64748B` | secondary text |
| `line` | `#E2E8F0` | borders |

Fonts (self-hosted, no Google request): **Bricolage Grotesque** (display),
**Geist** (body), **JetBrains Mono** (technical labels).

---

## Editing content

Everything is in **`src/data/portfolio.js`** — name, links, hero titles, about text,
security learning areas, skills, projects, education, experience, certifications.

### Add a project screenshot
1. Save it as e.g. `public/projects/markethawk.webp` (16:10 works best).
2. In `portfolio.js`, set `image: '/projects/markethawk.webp'` on that project.
   Until then, an abstract illustrative preview is shown (not a fake screenshot).

### Add a GitHub button to a project
Set `repo: 'https://github.com/…'` on the project. Buttons only appear when a URL exists.

### Add a cybersecurity lab / project
Add an object to `projects` with `category: 'security'` (an example is commented in
the file). As soon as one exists, the "All / Development / Security labs" filter appears
and the "reserved for upcoming labs" placeholder card disappears automatically.

### Add your university name
Set `institution: 'Your University'` on the BS Computer Science entry in `education`.

### Replace the CV
Overwrite `public/Ehtisham-Ali-CV.pdf` (keep the filename, or change `cvFile` in `portfolio.js`).

---

## Contact form

**Default (no setup):** the form validates input, then opens the visitor's email app
with your address, subject and message pre-filled (`mailto:`).
*Limitation:* it needs an email app configured on the visitor's device; on some
computers nothing opens. The form says so and shows your email as a fallback, and
there's a one-click "copy email" button.

**Optional — real inbox delivery (free):** create a free form at
[Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com), then add a
`.env` file:

```
VITE_FORM_ENDPOINT=https://formspree.io/f/your-id
```

Rebuild, and the form will POST JSON to that endpoint with a sending state,
success message and error fallback. (See `.env.example`.)

---

## 3D & performance notes

- Both 3D scenes are **lazy-loaded** (three.js is a separate chunk, not in the first load),
  mount only when scrolled near, **pause rendering when off-screen** or when the tab is hidden.
- Node/particle counts and pixel ratio drop automatically on phones and low-power devices.
- On touch devices the VLAN model doesn't capture drags (so the page scrolls normally) — it
  spins slowly and is controlled with the VLAN buttons.
- No WebGL? A static fallback renders instead; scene errors never break the page.
- **Reduced motion** is respected everywhere (Motion `reducedMotion="user"` + CSS media query):
  typing, floating, auto-rotation and packets stop.

## Accessibility
Skip-to-content link, semantic landmarks, `aria-current` on the active nav item,
keyboard-reachable menu (Esc closes), visible focus rings, labelled form fields with
inline errors, alt text on the portrait, live region for form status.

## Before you deploy
- Update the domain in `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`) —
  currently set to your existing Netlify portfolio URL.
- Optionally add project screenshots and GitHub repo links as above.
