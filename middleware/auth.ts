import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"
import jwt from 'jsonwebtoken'

export const validateJwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Bearer <token>
        const token: string | undefined = req.headers.authorization?.split(' ')[1]
        if (!token) throw new Error('Token is missing')
        if (!process.env.SECRET_KEY) throw Error ('Internal error')
        const decodedToken: string | JwtPayload = jwt.verify(token, process.env.SECRET_KEY)
        
        if (typeof decodedToken == 'string') throw new Error('Unexpected jwt token type')
        req.body.email = decodedToken.email

        next()
        
    } catch (error: any) {
        console.error(`Error in ${validateJwtMiddleware.name}: ${error.stack}`)
        res.status(401).json({
            error: error.message
        })
    }
}