import { Collection, InsertOneResult, ObjectId } from "mongodb"
import { db } from ".."


export const createUser = async (user:IUser): Promise<string> => {
    const usersCollection: Collection = db.collection('users')
    const result: InsertOneResult = await usersCollection.insertOne(user)
    return result.insertedId.toString()
}

export const getUserById = async (userId: string) => {
    const usersCollection: Collection = db.collection('users')
    const result = await usersCollection.findOne({_id:new ObjectId(userId)})
    return result as unknown as IUser
}

export const getUserByEmail = async(email:string) => {
    const usersCollection: Collection = db.collection('users')
    const user = await usersCollection.findOne({email})
    return user as unknown as IUser
}