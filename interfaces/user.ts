interface IDisplayUser {
    email: string,
    name: string
}

interface IUser extends IDisplayUser {
    password: string
}