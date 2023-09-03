import { Router } from "express"
// import { loginController, signupController } from "../controllers/usersController"
import * as userController from "../controllers/usersController"


export const usersRouter = Router()

usersRouter.post('/signup', userController.signupController)
usersRouter.post('/login', userController.loginController)