import { getUserTasks } from "../dal/tasksDAL"
import { ITask } from "../interfaces/task"

export const getUserTasksHandler = async (userId: string): Promise<Array<ITask>> => {
    const tasks = await getUserTasks(userId)
    return tasks
}

export const createTaskHandler = (taskData: ITask) => {
    
}