import React from "react";
import useTaskList, {
  ITask,
} from "../Services/UseTasksList";
import FormHeader from "./FormHeader";
import ItemTask from "./ItemTask";

export default function Tasks() {
  const { list, setList } = useTaskList();

  const setTasks = () => {
    return list.map((item: ITask) => {
      return (
        <ItemTask
          key={item.id}
          item={item}
          list={list}
          setList={setList}
        />
      );
    });
  };

  return (
    <>
      <FormHeader list={list} setList={setList} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tarefa</th>
            <th scope="col">Concluída</th>
          </tr>
        </thead>
        <tbody>{setTasks()}</tbody>
      </table>
    </>
  );
}
