import { useFormik } from "formik";
import * as Yup from "yup";
import { ITask } from "../Services/UseTasksList";
import UseCreateTask from "../Services/UseCreateTask";
import FindTasks from "../Services/FindTasks";

interface IFormHeader {
  list: ITask[];
  setList(param: ITask[]): void;
}

export default function FormHeader({
  list,
  setList,
}: IFormHeader) {
  const formTask = useFormik({
    initialValues: {
      task: "",
      done: false,
    },
    onReset: values => {
      formTask.setValues({
        task: "",
        done: false,
      });
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      task: isRequired,
    }),
    onSubmit: async values => {
      const itemNew: ITask | void = await UseCreateTask({
        form: values,
        setFieldError: formTask.setFieldError,
      });
      if (itemNew) {
        setList([itemNew, ...list]);
      }
    },
  });

  const inputTask: string = `newShearTask`;
  const inputDone: string = `newShearDone`;

  const className: string[] = ["form-control"];
  if (formTask.errors.task) {
    className.push("is-invalid");
  }

  return (
    <>
      <form
        onReset={formTask.handleReset}
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
          <button
            type="submit"
            className="btn btn-primary me-1"
          >
            Salvar
          </button>
          <button
            type="button"
            className="btn btn-success me-1"
            onClick={() => {
              FindTasks({
                task: formTask.values.task,
                setList,
              });
            }}
          >
            Buscar
          </button>
          <button
            type="reset"
            className="btn btn-secondary"
          >
            Limpar
          </button>
        </div>
      </form>
    </>
  );
}

const isRequired = Yup.string().required(
  "Campo obrigatório.",
);
