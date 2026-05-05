# The Manager

> A football management game. Desktop, offline, free.

You pick a club, set a formation, simulate matches, handle transfers, and finish the season. No account required, no internet connection, no installer beyond a single executable.

**Status:** In active development. Not yet playable.

---

## Why this exists

Football Manager costs ~€60/year and requires a decent machine. The free alternatives are either browser games with aggressive monetisation, abandoned projects from the early 2000s, or academic simulators with no usable interface.

There is no option that is simultaneously: free, fully offline, cross-platform natively, and deep enough to keep you playing past the first season.

This is that option — minus real player names, minus 3D match engine, minus anything that would require a licence or a server.

---

## What it is and is not

**It is:**
- A text/stats-based football management simulation
- A match engine that produces realistic-feeling results from squad attributes
- Squad management, transfers, contracts, finances, promotion/relegation
- A single executable with zero runtime dependencies

**It is not:**
- A web app. There is no server, no account, no telemetry.
- Football Manager. It does not attempt to replicate FM's depth, real player data, or 3D engine.

---

## Stack

| Layer | Technology |
|---|---|
| Desktop shell | Tauri 2 |
| Database | SQLite via `rusqlite` (bundled) |
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| State | Zustand |
| Validation | Zod |
| Build | Vite 7 + pnpm |

---

## Building from source

### Prerequisites

- [Rust](https://rustup.rs/) (stable, latest)
- [Node.js](https://nodejs.org/) 20+ (build-time only)
- [pnpm](https://pnpm.io/) 9+
- Platform build tools: see [Tauri prerequisites](https://tauri.app/start/prerequisites/)

### Steps

```bash
git clone https://github.com/vvasconceloss/the-manager.git
cd the-manager
pnpm install
pnpm tauri dev       # development mode
pnpm tauri build     # production build
```

Tests:

```bash
# Tauri
cd src-tauri
cargo test -p engine   # game engine unit tests (no Tauri required)
cargo test -p database # database layer tests

# Root
pnpm vitest            # frontend component tests
```

---

## Contributing

The project uses strict TDD (Red → Green → Refactor). Every piece of game logic has a test before it has an implementation.

Before opening a PR:
- `cargo test` passes with no warnings
- `pnpm vitest` passes
- Commit messages describe behavior, not intent: `rejects transfer when budget insufficient` not `fix transfer bug`

---

## Licence

MIT. See [LICENSE](./LICENSE).
