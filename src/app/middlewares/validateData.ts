import { body } from "express-validator";

const validateData = [
  body("task")
    .notEmpty()
    .withMessage("A tarefa é obrigatória.")
    .isLength({ min: 8, max: 45 })
    .withMessage(
      "Informe uma tarefa com pelo menos 8 caracteres e no máximo 45.",
    ),
  body("done")
    .isBoolean({ strict: true })
    .withMessage("Qual é o status da tarefa?"),
];

export default validateData;
