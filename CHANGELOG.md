<!-- faf: faf-grid | TypeScript | cli | Inspect any package.json or GitHub repo through the FAF GRID -->
<!-- faf: doc=changelog | latest=v0.1.0 | canonical=project.faf | family=FAF -->

# Changelog

## 0.1.0 (2026-05-05) — first ship

Thin CLI wrapper for the FAF GRID at [mcpaas.live/grid](https://mcpaas.live/grid).

### Added

- **`faf-grid`** binary. Fetches and prints the canonical text view of any
  grid surface.
- **Structural view** (default) for npm packages and GitHub repos:
  `faf-grid react`, `faf-grid facebook/react`.
- **TSA view** with `--tsa` flag — classifies declared deps as CORE / ACTIVE /
  DORMANT by counting actual imports. JS/TS only (memory:
  `grid-tsa-language-tier-doctrine`).
- **Browser opener** with `--open` flag — opens the HTML view instead of
  printing.
- **Override base URL** with `MCPAAS_URL=...` env var (for testing or
  self-hosted MCPaaS instances).
- **Help + version** flags.

### Architecture

This CLI is a tributary, not a re-implementation. The grid lives at
`mcpaas.live/grid` (the URL is the product). This CLI fetches `/grid.txt`
and prints it. Each invocation is one HTTPS request. Memory:
`cli-vs-url-migration-pattern` — URL-as-product strategy.

### Doctrinal scope (locked at first ship)

- TSA view supports JavaScript/TypeScript only (memory:
  `grid-tsa-language-tier-doctrine`). Other languages = sponsor-gated.
- The CLI does NOT cache locally. Caching lives at the edge
  (Cloudflare KV, 1h structural / 6h TSA). Predictable behavior.
- The CLI does NOT do its own analysis. All classification logic stays
  on the Worker. If the Worker improves, every CLI user benefits at the
  next invocation.
