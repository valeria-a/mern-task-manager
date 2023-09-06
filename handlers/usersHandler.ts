import { createUser, getUserByEmail, getUserById } from "../dal/usersDAL"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signupHandler = async (user: IUser): Promise<IDisplayUser | null> => {
    user.password = await bcrypt.hash(user.password, 10)
    const userId = await createUser(user)
    const newUser = await getUserById(userId)
    const retUser:IDisplayUser = {
        email: newUser.email,
        name: newUser.name
    } 
    return retUser
}

export const loginHandler = async (email: string, password: string) => {
    if (!process.env.SECRET_KEY) {
        throw new Error("No SECRET KEY provided")
    }
    
    // find user by email
    const user = await getUserByEmail(email)
    if (!user) {
        throw new Error("Wrong credentials")
    }
    const isCorrect = await bcrypt.compare(password, user.password)
    if (isCorrect) {
        const token = jwt.sign({email: user.email}, process.env.SECRET_KEY)
        return token
    } else {
        throw new Error("Wrong credentials")
    }
}