# Star Wars Viewing Order

An interactive timeline that shows every Star Wars film and series in **exact chronological story order** — so you always know what to watch next.

**Live Site:** [https://star-wars-navid1256s-projects.vercel.app](https://star-wars-navid1256s-projects.vercel.app)

---

## About

With 19 titles spread across movies, live-action series, and animated shows, figuring out the correct viewing order is confusing. This project arranges the entire saga across **5 eras** — from *The Phantom Menace* all the way to *The Rise of Skywalker* — and lets you explore it visually.

The experience starts with a cinematic intro: the classic blue "A long time ago…" text, the Star Wars logo reveal, the yellow scrolling crawl, and a hyperspace shooting-star field.

## Features

- **Chronological Timeline** — 19 titles ordered by in-universe timeline, grouped into 5 eras:
  - Fall of the Jedi
  - Reign of the Empire
  - Age of Rebellion
  - The New Republic
  - Rise of the First Order
- **Release Order Toggle** — switch between chronological story order and theatrical release order with one click
- **Beginner Mode** — simple, spoiler-free summaries for people new to Star Wars
- **Search** — instantly filter titles by name
- **Era Filtering** — focus on a single era or view everything
- **Expandable Cards** — click any poster to see details, continuity notes, and timeline placement
- **Supplementary Section** — extra titles that expand the universe
- **Cinematic Intro** — hyperspace starfield animation with skip button (plays once per visit)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Animations | Framer Motion + Canvas API |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 20+ (or [Bun](https://bun.sh/))

### Installation

```bash
# Clone the repository
git clone https://github.com/navid1256/Star-Wars.git
cd Star-Wars

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The project is deployed on **Vercel**. Any push to the `main` branch triggers an automatic deployment.

To deploy your own instance:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
src/
├── app/                  # App Router pages and layout
├── components/sw/        # Star Wars components
│   ├── HyperspaceIntro   # Cinematic intro animation
│   ├── Hero              # Hero section with sort buttons
│   ├── Navbar            # Header navigation
│   ├── Timeline          # Main timeline grid
│   ├── TimelineCard      # Expandable title cards
│   ├── FilterBar         # Era filters and search
│   └── SupplementaryTitles
├── data/                 # Timeline data (all 19 titles)
├── hooks/                # Custom hooks (poster tilt effect)
└── lib/                  # Constants and helpers
```

---

*May the Force be with you.*
