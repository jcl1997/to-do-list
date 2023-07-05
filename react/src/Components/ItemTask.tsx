import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITask } from "../Services/UseTasksList";
import {
  faClose,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import UseRemoveTask from "../Services/UseRemoveTask";
import Checkbox from "./Checkbox";
import Form from "./Form";
import { Fragment, useState } from "react";
import React from "react";

interface IItemTask {
  item: ITask;
  list: ITask[];
  setList(param: ITask[]): void;
}

export default function ItemTask({
  item,
  list,
  setList,
}: IItemTask) {
  const [show, setShow] = useState<boolean>(false);
  const [current, setCurrent] = useState<ITask>(item);

  const form = () => {
    if (show) {
      return (
        <tr>
          <td colSpan={3}>
            <Form
              item={current}
              setUpdateItem={setCurrent}
            />
          </td>
        </tr>
      );
    }

    return null;
  };

  return (
    <Fragment>
      <tr>
        <td>
          <div className="d-flex justify-content-around align-items-center">
            <FontAwesomeIcon
              icon={faClose}
              title="Remove tarefa"
              onClick={() => {
                UseRemoveTask({
                  list,
                  setList,
                  item: current,
                });
              }}
            />
            <FontAwesomeIcon
              icon={faPen}
              title="Edita tarefa"
              onClick={() => setShow(!show)}
            />
          </div>
        </td>
        <td>{current.task}</td>
        <td>
          <Checkbox
            item={current}
            setUpdateItem={setCurrent}
          />
        </td>
      </tr>
      {form()}
    </Fragment>
  );
}
