import { Request, Response } from "express"
import { getUserTasksHandler } from "../handlers/tasksHandler"
import { ITask } from "../interfaces/task"

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

export const createTaskController = (req:Request, res: Response) => {

}