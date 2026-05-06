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

### What's NOT yet shipped (will earn the 0.2.0 mint)

Per `feedback-semver-receipts-not-promises` — don't bump minor until
receipts.

- **WJTTC suite** — championship-grade tests across BRAKE / ENGINE /
  AERO / RECEIPT tiers. Targeting:
  - **BRAKE** — argv parsing, URL building, exit codes, stderr/stdout discipline
  - **ENGINE** — each invocation hits the right `mcpaas.live/grid.txt?…` URL,
    `--tsa` flips view correctly, `--open` spawns the right OS command
  - **AERO** — help text accurate, `--version` matches `package.json`,
    `MCPAAS_URL` env override works
  - **RECEIPT (Tier 9)** — output conforms to `application/vnd.faf-grid`
    grammar (same parser as the mcpaas-cf v1.5 audit suite)
- **CAR Framework completion** — project.faf is the **Claim** (✅ shipped
  Trophy 100% in this release); WJTTC will be the **Audit**; the `.taf`
  receipts WJTTC produces will be the **Receipt**. The full triangle lands
  with 0.2.0.
