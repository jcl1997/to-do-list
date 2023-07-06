import { NextFunction, Response, Request } from "express";
import {
  Result,
  ValidationError,
  validationResult,
} from "express-validator";

export default function taskDataValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors: Result<ValidationError> =
    validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
}
