#!/usr/bin/env node
// <!-- faf: faf-grid | TypeScript | cli | Inspect any package.json or GitHub repo through the FAF GRID — a debugging UI at mcpaas.live/grid -->
// <!-- faf: doc=cli | family=FAF | related=mcpaas-cf,faf-cli,grok-faf-mcp | canonical=https://mcpaas.live/grid -->
//
// faf-grid — thin CLI wrapper around mcpaas.live/grid.
//
// All actual rendering happens at the URL. This CLI is a tributary that
// drives traffic to the canonical surface. Memory:
// cli-vs-url-migration-pattern — URL-as-product strategy; CLIs are wrappers
// that route to the URL, not local re-implementations of the URL's logic.
//
// Usage:
//   faf-grid                     prints the FAF skill grid (default)
//   faf-grid <pkg>               prints structural grid for an npm package
//   faf-grid <owner>/<repo>      prints grid for a GitHub repo
//   faf-grid <pkg> --tsa         TSA view (declared deps vs actually used)
//   faf-grid <pkg> --open        opens browser at the HTML view instead
//   faf-grid --help              shows this help

const BASE_URL = process.env.MCPAAS_URL || 'https://mcpaas.live';
const VERSION = '0.1.0';
const USER_AGENT = `faf-grid/${VERSION} (https://mcpaas.live/grid)`;

// ── Args parsing ───────────────────────────────────────────────────────────

interface Args {
  target?: string;       // npm name or owner/repo
  tsa: boolean;
  open: boolean;
  help: boolean;
  version: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { tsa: false, open: false, help: false, version: false };
  for (const a of argv) {
    if (a === '--tsa' || a === '-t') args.tsa = true;
    else if (a === '--open' || a === '-o') args.open = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else if (a === '--version' || a === '-v') args.version = true;
    else if (!args.target && !a.startsWith('-')) args.target = a;
  }
  return args;
}

// ── URL builders ───────────────────────────────────────────────────────────

function buildQuery(target: string | undefined, tsa: boolean): string {
  const view = tsa ? '&view=tsa' : '';
  if (!target) return '';
  // Slash → GitHub repo; otherwise npm package
  const param = target.includes('/') && !target.startsWith('@')
    ? `gh=${encodeURIComponent(target)}`
    : `npm=${encodeURIComponent(target)}`;
  return `?${param}${view}`;
}

function htmlUrl(target: string | undefined, tsa: boolean): string {
  return `${BASE_URL}/grid${buildQuery(target, tsa)}`;
}

function textUrl(target: string | undefined, tsa: boolean): string {
  return `${BASE_URL}/grid.txt${buildQuery(target, tsa)}`;
}

// ── Browser opener (cross-platform) ────────────────────────────────────────

async function openInBrowser(url: string): Promise<void> {
  const { spawn } = await import('child_process');
  const cmd =
    process.platform === 'darwin' ? 'open' :
    process.platform === 'win32' ? 'start' :
    'xdg-open';
  spawn(cmd, [url], { stdio: 'ignore', detached: true }).unref();
}

// ── Help / version ─────────────────────────────────────────────────────────

const HELP = `faf-grid v${VERSION} — inspect any package.json through the FAF GRID

USAGE:
  faf-grid                       Print the FAF skill grid (default)
  faf-grid <pkg>                 Structural grid for an npm package
  faf-grid <owner>/<repo>        Grid for a GitHub repo
  faf-grid <pkg> --tsa           TSA view: declared deps vs actually used
  faf-grid <target> --open       Open the HTML view in your browser
  faf-grid --help | --version

EXAMPLES:
  faf-grid react
  faf-grid lodash --tsa
  faf-grid facebook/react
  faf-grid Wolfe-Jam/faf-cli --tsa
  faf-grid @types/node
  faf-grid react --open

The actual rendering lives at ${BASE_URL}/grid. This CLI fetches the
canonical text view and prints it. Same data, different surface.

Doctrine: cli-vs-url-migration-pattern — URL-as-product. The grid lives
at the URL; this CLI is a tributary.`;

// ── Main ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(HELP);
    return;
  }
  if (args.version) {
    console.log(`faf-grid ${VERSION}`);
    return;
  }

  if (args.open) {
    const url = htmlUrl(args.target, args.tsa);
    console.error(`Opening ${url} ...`);
    await openInBrowser(url);
    return;
  }

  // Default: fetch the canonical text view + print
  const url = textUrl(args.target, args.tsa);
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'text/plain',
        'User-Agent': USER_AGENT,
      },
    });
    if (!res.ok) {
      console.error(`faf-grid: HTTP ${res.status} from ${url}`);
      process.exit(1);
    }
    const body = await res.text();
    process.stdout.write(body);
    if (!body.endsWith('\n')) process.stdout.write('\n');
  } catch (e: any) {
    console.error(`faf-grid: failed to fetch ${url}`);
    console.error(`  ${e?.message || e}`);
    console.error(`\nIs ${BASE_URL} reachable? You can override with MCPAAS_URL=...`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('faf-grid: unexpected error');
  console.error(e);
  process.exit(1);
});
