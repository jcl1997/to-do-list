import { useEffect, useState } from "react";
import api from "./api";
import { showToastMessageErro } from "./Toast";

export interface ITask {
  id: number;
  task: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IUseTaskList {
  list: ITask[];
  setList(param: ITask[]): void;
}

export default function UseTaskList(): IUseTaskList {
  const [list, setList] = useState<ITask[]>([]);
  useEffect(() => {
    async function getTask() {
      try {
        const { data, status } = await api.get("/tasks");
        if (status === 200) {
          setList(data);
        }
      } catch (e) {
        showToastMessageErro();
      }
    }

    if (!list.length) {
      getTask();
    }
  }, [list]);

  return {
    list,
    setList,
  };
}
