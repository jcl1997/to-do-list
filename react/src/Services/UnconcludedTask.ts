import api from "./api"
import { showToastMessageErro, showToastMessageSuccess } from "./Toast";
import { ITask } from "./UseTasksList"

export default async function UnconcludedTask(item: ITask) : Promise<ITask> {
    try {
        const { data, status } = await api.patch(`/task/${item.id}/unconcluded`);
        if (status === 200) {
            item = data;
        }
        showToastMessageSuccess();
    } catch (e) {
        showToastMessageErro();
    }

    return item
}