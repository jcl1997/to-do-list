import api from "./api"
import { showToastMessageErro, showToastMessageSuccess } from "./Toast";
import { ITask } from "./UseTasksList"

export default async function ConcludedTask(item: ITask) : Promise<ITask> {
    try {
        const { data, status } = await api.patch(`/task/${item.id}/concluded`);
        if (status === 200) {
            item = data;
        }
        showToastMessageSuccess();
    } catch (e) {
        showToastMessageErro();
    }

    return item
}