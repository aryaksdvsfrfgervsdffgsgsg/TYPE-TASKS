# TypeTasks — Part 1: The Typed Model

A small, type-safe task tracker model in TypeScript (no UI yet — that's Part 2).

## Files
- `model.ts` — `TaskStatus`, `Task`, and all operations
- `demo.ts` — optional runnable example
- `tsconfig.json` — strict TypeScript config

## Operations
| Function | What it does |
|---|---|
| `addTask(tasks, title)` | New array with a new `"todo"` task and a unique id |
| `completeTask(tasks, id)` | New array with that task set to `"done"` |
| `filterByStatus(tasks, status)` | Only tasks matching `status` (invalid status = compile error) |
| `deleteTask(tasks, id)` *(mine)* | New array without that task |
| `advanceTask(tasks, id)` *(mine)* | `todo → in-progress → done` |
| `countByStatus(tasks, status)` *(mine)* | Number of tasks with that status |

All operations are pure: they return new arrays and never mutate the input.

## Run
```bash
npm install
npx tsc          # zero type errors
npm run demo     # build + run demo
```
