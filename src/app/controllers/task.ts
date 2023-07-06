import { Request, Response } from "express";

import Task from "../models/Tasks";
import { Op } from "sequelize";

export async function create(req: Request, res: Response) {
  const { task, done } = req.body;
  const newTask = await Task.create({ task, done });
  return res.status(200).json(newTask);
}

export async function getOne(req: Request, res: Response) {
  return res.status(200).json(req.body.item);
}

export async function getAll(req: Request, res: Response) {
  const { task = "" } = req.query;
  const tasks = await Task.findAll({
    where: {
      task: {
        [Op.like]: `%${task}%`,
      },
    },
  });

  return res.status(200).json(tasks);
}

export async function updateOne(
  req: Request,
  res: Response,
) {
  const { taskId } = req.params;
  const { task: taskDescription, done, item } = req.body;

  await item.update(
    { task: taskDescription, done },
    {
      where: {
        id: taskId,
      },
    },
  );

  return res.status(200).json(item);
}

export async function deleteOne(
  req: Request,
  res: Response,
) {
  const { taskId } = req.params;
  await Task.destroy({ where: { id: taskId } });

  return res
    .status(200)
    .json({ message: "Tarefa Excluida" });
}

export async function concluded(
  req: Request,
  res: Response,
) {
  const { taskId } = req.params;
  const { item } = req.body;

  await item.update(
    { done: true },
    { where: { id: taskId } },
  );

  return res.status(200).json(item);
}

export async function unconcluded(
  req: Request,
  res: Response,
) {
  const { taskId } = req.params;
  const { item } = req.body;

  await item.update(
    { done: false },
    { where: { id: taskId } },
  );

  return res.status(200).json(item);
}
