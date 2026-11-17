// demo.ts — quick runnable check of model.ts (optional).
import {
  addTask, completeTask, filterByStatus,
  deleteTask, advanceTask, countByStatus,
  type Task,
} from "./model.js";

let tasks: Task[] = [];
tasks = addTask(tasks, "Design the data model");
tasks = addTask(tasks, "Write operations");
tasks = addTask(tasks, "Open the pull request");
tasks = completeTask(tasks, 1);
tasks = advanceTask(tasks, 2);
tasks = deleteTask(tasks, 3);
tasks = addTask(tasks, "Part 2: build the UI"); // id 3 is reused only because the deleted task was the highest id

console.log("All:", tasks);
console.log("Done:", filterByStatus(tasks, "done"));
console.log("In progress:", countByStatus(tasks, "in-progress"));
