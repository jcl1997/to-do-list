import express from "express";
import path from "path";
import {
  concluded,
  create,
  deleteOne,
  getAll,
  getOne,
  unconcluded,
  updateOne,
} from "./app/controllers/task";

import validateData from "./app/middlewares/validateData";
import taskDataValidator from "./app/middlewares/taskDataValidator ";
import findTaskOrAnErrorThrown from "./app/middlewares/findTaskOrAnErrorThrown";

const routes = express.Router();

routes.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
routes.get("/tasks", getAll);
routes.post(
  "/task",
  validateData,
  taskDataValidator,
  create,
);
routes.get(
  "/task/:taskId",
  findTaskOrAnErrorThrown,
  getOne,
);
routes.put(
  "/task/:taskId",
  validateData,
  taskDataValidator,
  findTaskOrAnErrorThrown,
  updateOne,
);
routes.delete(
  "/task/:taskId",
  findTaskOrAnErrorThrown,
  deleteOne,
);
routes.patch(
  "/task/:taskId/concluded",
  findTaskOrAnErrorThrown,
  concluded,
);
routes.patch(
  "/task/:taskId/unconcluded",
  findTaskOrAnErrorThrown,
  unconcluded,
);

export default routes;
