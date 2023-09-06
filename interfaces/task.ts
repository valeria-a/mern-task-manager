export interface ITask {
    title: string,
    description?: string,
    // description: string | null
    userId: string,
    done: boolean
}