import { Request, Response } from "express"
import { loginBodySchema, userBodySchema } from "./userBodyValidator"
import { loginHandler, signupHandler } from "../handlers/usersHandler";

const validateSchema = (body: any, schema: any, res: Response) => {
    try {
        const parsedObj = schema.parse(body)
        return parsedObj
    } catch (error) {
        res.status(400).json({error}).send()
    }
}

export const loginController = async (req:Request, res: Response) => {
    const parsedObj = validateSchema(req.body, loginBodySchema, res)
    const token = await loginHandler(parsedObj.email, parsedObj.password)
    res.status(200).json({token})
}

export const signupController = async (req:Request, res: Response) => {
    let user: IUser;
    try {
        user = userBodySchema.parse(req.body)
    } catch (error) {
        res.status(400).json({error})
        return
    }
    const result = await signupHandler(user)
    res.status(200).json(result)
}