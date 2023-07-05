import api from "./api";
import { showToastMessageErro } from "./Toast";
import { ITask } from "./UseTasksList";

interface IUseFindTasks {
  task: string;
  setList(param: ITask[]): void;
}

export default async function FindTasks({
  task,
  setList,
}: IUseFindTasks): Promise<void> {
  try {
    let url: string = "/tasks";
    if (task) {
      url = `${url}?task=${task}`;
    }
    const { data, status } = await api.get(url);
    if (status === 200) {
      setList(data);
    }
  } catch (e) {
    showToastMessageErro();
  }
}
