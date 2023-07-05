import api from "./api";
import { showToastMessageErro, showToastMessageSuccessExcluido } from "./Toast";
import { ITask } from "./UseTasksList";

interface IUseRemoveTask {
    item: ITask,
    list: ITask[],
    setList(param: ITask[]): void
}

export default async function UseRemoveTask({
    item,
    list,
    setList
} : IUseRemoveTask) : Promise<void> {
    try {
        const { status } = await api.delete(`/task/${item.id}`);
        if (status === 200) {
            setList(list.filter((i : ITask) => i.id !== item.id));
        }

        showToastMessageSuccessExcluido();
    } catch (e) {
        showToastMessageErro();
    }
}