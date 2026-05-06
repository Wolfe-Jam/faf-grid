<!-- faf: faf-grid | TypeScript | cli | Inspect any package.json or GitHub repo through the FAF GRID -->
<!-- faf: doc=readme | canonical=project.faf | family=FAF | siblings=CHANGELOG.md,project.faf -->

# faf-grid

[![FAF GRID](https://mcpaas.live/grid/badge?npm=faf-grid)](https://mcpaas.live/grid?npm=faf-grid)

**Inspect any `package.json` through the FAF GRID — a debugging UI at [mcpaas.live/grid](https://mcpaas.live/grid).**

> The badge above is faf-grid grading itself. Click it. The format that grades others has to grade itself first.

```bash
npx faf-grid react
```

That prints the canonical grid for `react@*` straight to your terminal — the same structural debug surface live at [mcpaas.live/grid?npm=react](https://mcpaas.live/grid?npm=react), in plain text, parseable.

## What does it do?

Two questions, two views, one URL primitive:

| View | Question | What you see |
|---|---|---|
| **Structural** (default) | What's declared in `package.json`? What's missing? | 6 blocks (identity, distribution, scripts, dependencies, engines, signals) of ~33 slots — filled or empty |
| **TSA** (`--tsa`) | Of what's declared, what's actually used? | Each declared dep classified as **CORE** / **ACTIVE** / **DORMANT** by counting actual imports in source |

Empty cells stay empty. Sparse stays sparse. We print what we see — no padding, no "coming soon."

## Usage

```bash
# Default — FAF skill grid (the periodic table)
npx faf-grid

# An npm package
npx faf-grid lodash
npx faf-grid @types/node
npx faf-grid request                # deprecated — banner surfaces honestly

# A GitHub repo
npx faf-grid facebook/react
npx faf-grid Wolfe-Jam/faf-cli

# TSA view — declared vs actually used (JS/TS only)
npx faf-grid lodash --tsa
npx faf-grid Wolfe-Jam/faf-cli --tsa

# Open in browser instead of printing
npx faf-grid react --open
```

## Why a CLI for a URL-based tool?

The actual rendering lives at [mcpaas.live/grid](https://mcpaas.live/grid). This CLI is a thin wrapper that fetches the canonical text view and prints it.

Two surfaces. One source of truth. The URL stays the canonical view (browser-shareable, link-unfurl friendly, embeddable as README badges). The CLI gives you the same data piped into a terminal, into a PR description, into an email — anywhere the URL can't reach.

```bash
# Pipe the grid into your PR description
gh pr create --body "$(npx faf-grid react)"

# Watch your repo's TSA view in CI
npx faf-grid Wolfe-Jam/your-repo --tsa
```

## Output format

Plain Markdown. Each block becomes a `## section` followed by a slot table:

```
# 🌐 GRID — react@19.2.5

**Source:** npm  ·  **Canonical:** https://registry.npmjs.org/react/19.2.5
**Slots:** 33  ·  **Filled:** 11  ·  **Empty:** 22  ·  **Warn:** 1

## identity
| Slot | Value | Filled |
|---|---|---|
| `name` | `react` | ✓ |
| `version` | `19.2.5` | ✓ |
| `license` | `MIT` | ✓ |
| `author` | — |   |
| `funding` | — |   |
...
```

Format: `application/vnd.faf-grid` *(IANA candidate sister to the registered `application/vnd.faf+yaml`)*.

## Installation

```bash
# One-off (recommended)
npx faf-grid <pkg>

# Or install globally
npm install -g faf-grid
faf-grid react
```

## Embed a badge

Add this to any repo's README to show its grid score live:

```markdown
[![FAF GRID](https://mcpaas.live/grid/badge?npm=YOUR_PKG)](https://mcpaas.live/grid?npm=YOUR_PKG)
```

Each click takes the reader to the live grid for your package. The badge updates automatically when the underlying data changes.

## License

MIT — see LICENSE.

---

*FAF defines. MD instructs. AI codes.*
