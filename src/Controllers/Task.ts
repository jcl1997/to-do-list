import { Request, Response } from "express";
import { Result, ValidationError, body, validationResult } from "express-validator";

import Task from "../Models/Tasks";

export const validationFormTask = [
    body("task")
        .notEmpty()
        .withMessage("A tarefa é obrigatória.")
        .isLength({ min: 8, max: 45 })
        .withMessage(
            "Informe uma tarefa com pelo menos 8 caracteres e no máximo 45."
        ),
    body('done').isBoolean({strict: true}).withMessage('Qual é o status da tarefa?'),
  ];

export async function home(req: Request, res: Response) {
    return res
        .status(422)
        .json({ message: 'home' });
}

export async function create(req: Request, res: Response) {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const {task, done} = req.body;

    const newTask = await Task.create({task, done});

    return res
        .status(200)
        .json(newTask);
}

export async function get(req: Request, res: Response) {
    const { taskId } = req.params;
    const task = await Task.findOne({where : { id: taskId }});
    if (!task) {
        return res.status(422).json({ errors: 'Não encontrado' });
    }

    return res
        .status(200)
        .json(task);
}

export async function list(req: Request, res: Response) {
    const tasks = await Task.findAll();

    return res
        .status(200)
        .json(tasks);
}

export async function edit(req: Request, res: Response) {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { taskId } = req.params;
    const task = await Task.findOne({where : { id: taskId }});
    if (!task) {
        return res.status(404).json({ errors: 'Não encontrado' });
    }

    const {task: taskDescription, done} = req.body;

    await task.update({task: taskDescription, done}, {
        where: {
          id: taskId
        },
    });

    return res
        .status(200)
        .json(task);
}

export async function remove(req: Request, res: Response) {
    const { taskId } = req.params;
    const task = await Task.findOne({where : { id: taskId }});
    if (!task) {
        return res.status(422).json({ errors: 'Não encontrado' });
    }

    await Task.destroy({where : { id: taskId }});

    return res
        .status(200)
        .json({message: "Tarefa Excluida"});
}

export async function concluded(req: Request, res: Response) {
    const { taskId } = req.params;
    const task = await Task.findOne({where : { id: taskId }});
    if (!task) {
        return res.status(422).json({ errors: 'Não encontrado' });
    }

    await task.update({done: true}, {where : { id: taskId }});

    return res
        .status(200)
        .json(task);
}

export async function unconcluded(req: Request, res: Response) {
    const { taskId } = req.params;
    const task = await Task.findOne({where : { id: taskId }});
    if (!task) {
        return res.status(422).json({ errors: 'Não encontrado' });
    }

    await task.update({done: false}, {where : { id: taskId }});

    return res
        .status(200)
        .json(task);
}