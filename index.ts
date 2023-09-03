import express, { Express, NextFunction, Request, Response } from "express";
import { requestMiddleware } from "./middleware/common";
import { tasksRouter } from "./routes/tasks";
import { usersRouter } from "./routes/users";


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



app.listen(8000, () => {
    console.log('server is running')
})