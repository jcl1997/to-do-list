import { AxiosError } from "axios";
import { ITask } from "./UseTasksList";
import api from "./api";
import {
  showToastMessageErro,
  showToastMessageSuccess,
} from "./Toast";

interface ITaskForm {
  task: string;
  done: boolean;
}

interface IUseUpdateTask {
  form: ITaskForm;
  setFieldError(param: string, message: string): void;
}

interface IErrors {
  location: string;
  msg: string;
  path: string;
  type: string;
}

export default async function CreateTask({
  form,
  setFieldError,
}: IUseUpdateTask): Promise<ITask | void> {
  try {
    const { data, status } = await api.post("/task", {
      task: form.task,
      done: form.done,
    });
    if (status === 200) {
      showToastMessageSuccess();
      return data;
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const erros: IErrors[] =
        e.response!.data.errors!.filter(
          (item: IErrors) =>
            item.path.toString() === "task",
        );

      setFieldError(
        "task",
        erros.map((item: IErrors) => item.msg).join("\n"),
      );
    }
    showToastMessageErro();
  }
}
