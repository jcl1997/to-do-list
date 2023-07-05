import { useFormik } from "formik";
import * as Yup from "yup";
import { ITask } from "../Services/UseTasksList";
import UseUpdateTask from "../Services/UseUpdateTask";
import { useEffect } from "react";
import React from "react";

export interface IFormTask {
  item: ITask;
  setUpdateItem(param: ITask): void;
}

export default function Form({
  item,
  setUpdateItem,
}: IFormTask) {
  const formTask = useFormik({
    initialValues: {
      id: item.id,
      task: item.task,
      done: item.done,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      task: isRequired,
    }),
    onSubmit: async values => {
      const itemUpdate: ITask | void = await UseUpdateTask({
        form: values,
        setFieldError: formTask.setFieldError,
      });
      if (itemUpdate) {
        setUpdateItem(
          Object.assign({}, item, {
            task: itemUpdate.task,
            done: itemUpdate.done,
          }),
        );
      }
    },
  });

  const inputTask: string = `${item.id}task`;
  const inputDone: string = `${item.id}done`;

  useEffect(() => {
    formTask.setFieldValue("done", item.done);
  }, [item.done]);

  const className: string[] = ["form-control"];
  if (formTask.errors.task) {
    className.push("is-invalid");
  }

  return (
    <>
      <form
        onSubmit={formTask.handleSubmit}
        className="row g-3 align-items-center"
      >
        <div className="col-12">
          <label
            className="visually-hidden"
            htmlFor={inputTask}
          >
            Tarefa
          </label>
          <div className="input-group">
            <input
              id={inputTask}
              name={inputTask}
              placeholder="Tarefa"
              type="text"
              value={formTask.values.task}
              onChange={event => {
                formTask.setFieldValue(
                  "task",
                  event.target.value.toString(),
                );
              }}
              className={className.join(" ")}
            />
            {formTask.errors.task && (
              <div className="invalid-feedback">
                {formTask.errors.task}
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={inputDone}
              checked={formTask.values.done}
              onChange={() => {
                formTask.setFieldValue(
                  "done",
                  !formTask.values.done,
                );
              }}
            />
            <label
              className="form-check-label"
              htmlFor={inputDone}
            >
              Concluída
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}

const isRequired = Yup.string().required(
  "Campo obrigatório.",
);
