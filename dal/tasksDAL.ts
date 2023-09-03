import { Collection } from "mongodb"
import { db } from ".."
import { ITask } from "../interfaces/task"


export const getUserTasks = async (userId:string): Promise<Array<ITask>> => {
    const tasksCollection: Collection = db.collection('tasks')
    const tasksCursor = tasksCollection.find(
        {user_id: userId}, 
        {projection: {_id: false}})
    const tasks: Array<ITask> = []
    for await (const task of tasksCursor) {
        console.log('task', task)
        tasks.push({
            title: task.title,
            description: task.description,
            done: task.done,
            userId: task.user_id
        })
    }
    return tasks
}