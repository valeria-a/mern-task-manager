import {NextFunction, Request, Response} from "express";

export const requestMiddleware = (req:Request, res:Response, next:NextFunction) => {
    console.log(`url: ${req.url} \t body: ${JSON.stringify(req.body)} \t query_parms: ${JSON.stringify(req.query)}`)
    next()
    // res.status(401).send()
}