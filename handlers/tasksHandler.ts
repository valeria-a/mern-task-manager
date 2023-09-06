import { InsertOneResult } from "mongodb"
import { createTask, getUserTasks, getTaskById } from "../dal/tasksDAL"
import { ITask } from "../interfaces/task"

export const getUserTasksHandler = async (userId: string): Promise<Array<ITask>> => {
    const tasks = await getUserTasks(userId)
    return tasks
}

export const createTaskHandler = async (taskData: ITask) => {
    const insertResult:InsertOneResult = await createTask(taskData)
    const newTask = await getTaskById(insertResult.insertedId)
    return newTask
}