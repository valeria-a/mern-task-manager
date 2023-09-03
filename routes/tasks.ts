import { Router } from "express";
import { createTaskController, getUserTasksController } from "../controllers/tasksController";


export const tasksRouter = Router()


// localhost/tasks
tasksRouter.get('/', getUserTasksController)
tasksRouter.post('/', createTaskController)