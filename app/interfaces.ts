export interface IList {
    createdAt: string,
    name: string,
    id: number
}

export interface ITodo {
    name: string,
    complete: boolean,
    priority: string,
    dueDate: string,
    createdAt: string,
    tags: string,
    id: number,
    listId: number
}