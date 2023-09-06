import { Request, Response } from "express"
import { createTaskHandler, getUserTasksHandler } from "../handlers/tasksHandler"
import { ITask } from "../interfaces/task"
import { createTaskBodySchema } from "./tasksBodyValidator";

export const getUserTasksController = async (req:Request, res: Response) => {
    const userId:string = req.query['userId'] as string
    if (!userId) {
        res.status(400).json({
            error: 'userId not provided'
        })
        return
    }
    const tasks: Array<ITask> = await getUserTasksHandler(userId)
    res.status(200).json({
        results: tasks
    })
    
}

export const createTaskController = async (req:Request, res: Response) => {
    let body: ITask
    try {
        body = createTaskBodySchema.parse(req.body)
        const result = await createTaskHandler(body)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}