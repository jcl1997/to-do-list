import React from "react";
import ConcludedTask from "../Services/ConcludedTask";
import UnconcludedTask from "../Services/UnconcludedTask";
import { IFormTask } from "./Form";

export default function Checkbox({
  item,
  setUpdateItem,
}: IFormTask) {
  const inputId: string = `${item.id}checkbox`;

  return (
    <>
      <input
        id={inputId}
        type="checkbox"
        checked={item.done}
        onChange={async () => {
          if (item.done) {
            const itemUnconcluded = await UnconcludedTask(
              item,
            );
            setUpdateItem(itemUnconcluded);
            return;
          }
          const itemConcluded = await ConcludedTask(item);
          setUpdateItem(itemConcluded);
        }}
      />
    </>
  );
}
