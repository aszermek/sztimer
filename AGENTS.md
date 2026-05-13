# Agent Guidelines

## Stack

- **React 19** + **Vite 8** (Rolldown) + **TypeScript 6** (strict, `erasableSyntaxOnly`)
- **Jotai 2** for state — atoms live in `src/atoms/`
- **Tailwind v4** via `@tailwindcss/vite` (no PostCSS config)
- **shadcn/ui** (new-york style) in `src/components/ui/`, icon library is `@phosphor-icons/react`
- **Vitest 4** + React Testing Library for tests

## Commands

```bash
npm test -- --run        # run all tests once
npm run build            # tsc -b && vite build
npx eslint src           # lint
./node_modules/.bin/tsc --noEmit  # typecheck (npx tsc resolves the wrong binary)
```

All four must pass clean before committing.

## Project Layout

```
src/
  atoms/          # Jotai atoms; use atomWithStorage for anything that should persist
  components/
    ui/           # shadcn-generated components — edit carefully, preserve custom variants
    */            # specific components
  hooks/
    domain/       # feature hooks (useSpacebarTimer)
    utils/        # generic hooks (useMediaQuery)
  lib/            # pure utility functions (cn, formatTime, calculateAvg, drawScramble)
  types/          # shared TypeScript types
```

## Conventions

### State & Atoms

- Prefer derived atoms over component-local state where multiple components need the same data.
- Use `useSetAtom` / `useAtomValue` instead of `useAtom` when you only need one direction.
- Wrap persistent state in `atomWithStorage`.
- Avoid subscribing to a large atom when only a small derived value is needed — add a derived atom instead.

### Components & React

- Use `cn()` from `@/lib/utils` for all `className` composition.
- Don't sync props into state via `useEffect` — use the derived-state pattern (store previous prop + compare during render) or derive from props directly.
- Don't read or write `ref.current` during render — move those assignments into `useLayoutEffect`.
- Clean up third-party DOM elements in the `useEffect` return function.

### TypeScript

- No `as`-casts for narrowing — write a type guard.
- `moduleResolution: "bundler"` — no `baseUrl`, path alias is `@/` → `src/`.
- Lib target is `ES2022` — `Array.prototype.at()` and similar are available.

### Tests

- Prefer testing behaviour over implementation; don't assert on internal atom state directly.
- Jotai: create a real store per test with `createStore()` — don't mock the whole module.
- Use `vi.fn(function () { return instance; })` for mocked constructors — arrow functions can't be `new`-ed.

### shadcn/ui

- The components in `src/components/ui/` are the source of truth — don't regenerate without reviewing the diff first.
- Run `npx shadcn@latest diff` to check for upstream changes before manually editing UI components.
- When `shadcn add` scaffolds a new component it will generate lucide imports — swap them for `@phosphor-icons/react` equivalents before committing.
- Preserve custom variants: `xl` size on `Button`, `inputSize` CVA variant on `Input`.

## Verifying Library Behaviour

When uncertain about a library API, version compatibility, or breaking changes, use the **context7 MCP** to fetch up-to-date documentation before writing code:

```
mcp: context7 — fetch docs for <library>@<version>
```

Useful for: Jotai atom APIs, Radix & shadcn primitive props, Vitest config options, Tailwind v4 utility changes.
