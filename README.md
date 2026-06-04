# Todo — Carbon Design System

A minimal, keyboard-friendly todo app built with React, TypeScript, Vite, and [IBM Carbon Design System](https://carbondesignsystem.com/). Tasks are persisted in `localStorage` — no backend required.

---

## Features

- **Add tasks** — type in the composer and press Enter
- **Complete tasks** — click the checkbox to toggle; animated strikethrough on done items
- **Inline editing** — double-click any task label to edit it in place; confirm with Enter, cancel with Escape
- **Delete tasks** — hover a row to reveal the delete button (× icon)
- **Filter** — switch between All, Active, and Done views with live counts
- **Clear completed** — bulk-remove done tasks with a one-level **Undo** toast
- **Progress bar** — visual indicator of how many tasks are done
- **Time-of-day greeting** — header greeting updates based on the current hour
- **Keyboard shortcut** — press `/` anywhere (outside a text field) to jump focus to the composer; `Cmd/Ctrl+K` focuses and selects the input text
- **Persistent storage** — all tasks are saved to `localStorage` under the key `todo.v1` on every state change
- **Responsive** — adapts to mobile viewports

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| UI framework | React 18 |
| Language | TypeScript 5 |
| Build tool | Vite 5 |
| Design system | `@carbon/react` v1 |
| Icons | `@carbon/icons-react` |

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

The production build is output to `dist/`.

---

## Project Structure

```
src/
├── main.tsx            Entry point — mounts <App> inside StrictMode
├── App.tsx             Root component — all todo state, CRUD callbacks, layout
├── components/
│   └── TodoItem.tsx    Single list row — checkbox, editable label, timestamp, delete
└── index.css           All styles — Carbon CSS tokens, animations, responsive rules

designs/                Design assets and chat transcripts used to spec the app
dist/                   Production build output (committed for quick preview)
ARCHITECTURE.md         Detailed component tree, data flow, and UML diagrams
TODOS.md                Backlog of planned improvements
```

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus the new-task input |
| `Cmd / Ctrl + K` | Focus and select the input text |
| `Enter` (in composer) | Add task |
| `Double-click` a task | Begin inline edit |
| `Enter` (while editing) | Save edit |
| `Escape` (while editing) | Discard edit |

---

## Data Model

Each task is a plain object stored as JSON in `localStorage`:

```ts
interface Todo {
  id: string        // random 8-char alphanumeric
  text: string
  done: boolean
  createdAt: number // Unix timestamp (ms)
}
```

The array is serialized on every state change via a `useEffect`. On page load, `loadTodos()` reads and parses the stored value, falling back to a set of seed tasks if none exist or if the stored value is invalid.

---

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full component tree, UML class diagram, and data-flow diagram.
