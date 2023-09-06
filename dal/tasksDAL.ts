import { Collection, InsertOneResult, ObjectId } from "mongodb"
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


export const createTask = async (task:ITask) => {
    const tasksCollection: Collection = db.collection('tasks')
    const result: InsertOneResult = await tasksCollection.insertOne(task)
    return result
}

export const getTaskById = async(taskId: ObjectId) => {
    const tasksCollection: Collection = db.collection('tasks')
    const res = await tasksCollection.findOne({_id: taskId})
    return res
}