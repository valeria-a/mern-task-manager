import express, { Express, NextFunction, Request, Response } from "express";
import { requestMiddleware } from "./middleware/common";
import { tasksRouter } from "./routes/tasks";
import { usersRouter } from "./routes/users";

import dotenv from 'dotenv'
dotenv.config()

import { establishDBConnection } from "./dal/connection";
import { Db } from "mongodb";



const app:Express = express()

app.use(requestMiddleware)

app.use('/api/tasks', tasksRouter)
app.use('/api/users', usersRouter)

// app.get('/test', (req: Request, res: Response, next: NextFunction) => {
//     // console.log('req:', req)
//     res.status(200).json({
//         msg: 'Hi'
//     })
// })

export let db:Db;
establishDBConnection().then((db:Db) => {
    db = db
    app.listen(8000, () => {
        console.log('server is running')
    })
}).catch((error) => {
    console.error('Could not start server - failed to connect to DB', error)
})

