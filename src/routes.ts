import express from "express";
import path from "path";
import * as Task from "./Controllers/Task";

const routes = express.Router();

routes.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
routes.get("/tasks", Task.list);
routes.post("/task", Task.validationFormTask, Task.create);
routes.get("/task/:taskId", Task.get);
routes.put(
  "/task/:taskId",
  Task.validationFormTask,
  Task.edit,
);
routes.delete("/task/:taskId", Task.remove);
routes.patch("/task/:taskId/concluded", Task.concluded);
routes.patch("/task/:taskId/unconcluded", Task.unconcluded);

export default routes;
