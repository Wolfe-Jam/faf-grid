<!-- faf: faf-grid | TypeScript | cli | Inspect any package.json or GitHub repo through the FAF GRID — a debugging UI at mcpaas.live/grid -->
<!-- faf: doc=ai-context | claim=project.faf | score=100 | family=FAF | siblings=README.md,CHANGELOG.md,project.faf -->

# CLAUDE.md — faf-grid

## What This Is

Inspect any package.json or GitHub repo through the FAF GRID — a debugging UI at mcpaas.live/grid. CLI wrapper that fetches the canonical text view.

## Stack

- **Language:** TypeScript

## Context

- **Who:** JS/TS developers auditing package.json structure and dependency hygiene; teams sharing structural debug views in PRs and chats; maintainers of OSS packages wanting README badges that link back to live grid data.
- **What:** Inspect any package.json or GitHub repo through the FAF GRID — a debugging UI at mcpaas.live/grid. CLI wrapper that fetches the canonical text view.
- **Why:** package.json is the most-opened config file in the JS ecosystem, but no tool renders it as a debugging surface — npmjs.com renders marketing, bundlephobia renders one slice, depcheck renders deps. faf-grid pipes mcpaas.live/grid's truth-printing UI into the terminal so devs can pipe a grid into a PR description, an email, or any URL-unfriendly surface.
- **Where:** npm (faf-grid), github.com/Wolfe-Jam/faf-grid, calls https://mcpaas.live/grid.txt at runtime
- **When:** v0.1.0 — first ship 2026-05-05; tracks v1.5 series of mcpaas-cf
- **How:** npx faf-grid <pkg> for npm packages, npx faf-grid <owner>/<repo> for GitHub, --tsa for behavioral view, --open for browser. Zero install, zero auth, single HTTPS request per invocation.

---

*STATUS: BI-SYNC ACTIVE — 2026-05-06T03:22:11.050Z*
