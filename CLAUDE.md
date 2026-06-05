# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check (tsc) then bundle to dist/
npm run preview   # serve the production build locally
```

There is no test runner or linter configured — `npm run build` (which runs `tsc`) is the only static-analysis gate.

## Architecture

Single-page React + TypeScript app with no backend. All state lives in `App` and is passed down via callbacks to `TodoItem`. Persistence is handled by a single `useEffect` in `App` that serializes the `todos` array to `localStorage` on every change (key: `todo.v1`). On load, `loadTodos()` reads and parses that value, falling back to `seed()` if missing or invalid.

### State shape

```ts
interface Todo { id: string; text: string; done: boolean; createdAt: number }
type Filter = 'all' | 'active' | 'done'
```

`App` holds: `todos`, `filter`, `lastCleared` (one-level undo buffer), `toastMsg`, `showToast`.

### Styling

All styles are in `src/index.css` using Carbon CSS custom properties (`--cds-*` tokens) — no CSS modules or styled-components. Dark mode works via `prefers-color-scheme`; there is no manual toggle yet. The Geist font family is loaded from Google Fonts in `index.html`.

Carbon's global stylesheet is imported once in `src/main.tsx` via `@carbon/styles/css/styles.css`. Component-level Carbon styles come from `@carbon/react`.

### Inline editing

`TodoItem` uses a `contentEditable` div (not an `<input>`) for in-place editing. It is activated on double-click via `beginEdit()`, committed on blur/Enter, and reverted on Escape. If the text is empty on blur the item is deleted.

### Undo

"Clear completed" saves removed todos into `lastCleared`. The `ActionableNotification` toast renders an Undo button that calls `undo()`, which prepends `lastCleared` back to `todos`. There is only one undo level — a second clear overwrites the buffer.
