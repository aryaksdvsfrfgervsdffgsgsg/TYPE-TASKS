// model.ts — TypeTasks, Part 1: the typed logic layer.
// No UI here. Just the data model and operations that are guaranteed
// correct by the compiler.

/** A task's status can only ever be one of these three exact values. */
export type TaskStatus = "todo" | "in-progress" | "done";

/** Every task has exactly this shape. */
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

/**
 * Returns a NEW array with a new task appended.
 * The id is unique: one higher than the largest existing id (1 for an empty list),
 * so it stays unique even after tasks have been deleted.
 */
export function addTask(tasks: Task[], title: string): Task[] {
  const nextId: number =
    tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;

  const newTask: Task = { id: nextId, title, status: "todo" };
  return [...tasks, newTask];
}

/** Returns a NEW array where the task with the matching id is set to "done". */
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task): Task =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

/**
 * Returns only the tasks whose status matches.
 * `status` is typed as TaskStatus, so filterByStatus(tasks, "finished")
 * is a compile error.
 */
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

// ---------------------------------------------------------------------------
// Make It Yours — extra typed operations
// ---------------------------------------------------------------------------

/** Returns a NEW array without the task that has the given id. */
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

/** Maps each status to the one that comes next (done stays done). */
const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  todo: "in-progress",
  "in-progress": "done",
  done: "done",
};

/** Moves a task forward one step: todo -> in-progress -> done. */
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task): Task =>
    task.id === id ? { ...task, status: NEXT_STATUS[task.status] } : task
  );
}

/** Counts how many tasks have the given status. */
export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return filterByStatus(tasks, status).length;
}

// ---------------------------------------------------------------------------
// Proof the types are tight. Each line below is a compile error, which is
// why they are commented out. Un-comment one at a time and run `npx tsc`.
// ---------------------------------------------------------------------------
//
// const missingStatus: Task = { id: 1, title: "No status" };
//   -> error TS2741: Property 'status' is missing in type ...
//
// const stringId: Task = { id: "3", title: "Bad id", status: "todo" };
//   -> error TS2322: Type 'string' is not assignable to type 'number'.
//
// filterByStatus([], "finished");
//   -> error TS2345: Argument of type '"finished"' is not assignable to
//      parameter of type 'TaskStatus'.
