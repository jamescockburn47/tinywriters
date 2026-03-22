# CLAUDE.md — TinyWriters

## Project Overview

TinyWriters is a child-friendly writing practice web app for primary school children. It features 7 interactive activities across 3 categories (Creative Writing, Grammar, Essay Skills) with scoring, rewards, and progress tracking.

## Tech Stack

- **Vite + React** — SPA, no backend
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin
- **Framer Motion** — animations
- **Vercel** — static deployment

## Architecture

- `src/activities/` — One component per activity (7 total)
- `src/components/` — Shared UI components (Layout, ScoreBar, WordChip, etc.)
- `src/data/` — Data files with 50+ examples each (pure JS arrays)
- `src/hooks/` — Custom hooks (useScore, usePool, useRewards)
- All state is client-side React state + localStorage for persistence
- No database, no API calls, no backend

## Key Patterns

- **usePool hook** — shuffled rotation through data arrays, wraps and reshuffles at end
- **useScore hook** — points (3/2/1 based on attempts), streak tracking, localStorage persistence
- **Word types** — Build-a-Sentence uses typed words: determiner, noun, verb, adjective, adverb, preposition, conjunction, pronoun
- **Adjective order** — follows OSASCOMP: Opinion, Size, Age, Shape, Color, Origin, Material, Purpose

## Deployment

```bash
npm run dev      # local dev server
npm run build    # production build to dist/
npx vercel       # deploy to Vercel
```

## Data Files

Each activity has a dedicated data file in `src/data/` with 50+ examples. When adding examples:
- Keep format consistent with existing entries
- Build-a-Sentence words must have correct `type` annotations
- Adjective Order entries need correct `category` for each adjective
- Simile options must include 1 correct answer + 3 plausible distractors

## Design Decisions

1. **No dark mode** — children's app, keep it bright and colourful
2. **No timers** — self-paced, no pressure
3. **Minimum 48px touch targets** — tablet-friendly
4. **localStorage only** — no accounts, no server state
5. **Encouraging feedback** — varied success messages, no harsh failure language
