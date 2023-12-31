import express, { Express, NextFunction, Request, Response } from "express";
import { requestMiddleware } from "./middleware/common";
import { tasksRouter } from "./routes/tasks";
import { usersRouter } from "./routes/users";
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';


import dotenv from 'dotenv'
dotenv.config()

import { establishDBConnection } from "./dal/connection";
import { Db } from "mongodb";
import { validateJwtMiddleware } from "./middleware/auth";



const app:Express = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())

app.use(requestMiddleware)

app.use('/api/users', usersRouter)


app.use(validateJwtMiddleware)
app.use('/api/tasks', tasksRouter)

// app.get('/test', (req: Request, res: Response, next: NextFunction) => {
//     // console.log('req:', req)
//     res.status(200).json({
//         msg: 'Hi'
//     })
// })

export let db:Db;
establishDBConnection().then((db1:Db) => {
    db = db1
    app.listen(8000, () => {
        console.log('server is running')
    })
}).catch((error) => {
    console.error('Could not start server - failed to connect to DB', error)
})

