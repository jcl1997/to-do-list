import { NextFunction, Response, Request } from "express";
import Task from "../models/Tasks";

export default async function findTaskOrAnErrorThrown(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { taskId } = req.params;
  const task = await Task.findOne({
    where: { id: taskId },
  });
  if (!task) {
    return res
      .status(404)
      .json({ errors: "Não encontrado" });
  }

  req.body.item = task;

  next();
}
