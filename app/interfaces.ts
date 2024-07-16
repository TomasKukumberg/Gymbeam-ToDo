export interface List {
    createdAt: string,
    name: string,
    id: number
}

export interface Item {
    name: string,
    complete: boolean,
    priority: string,
    dueDate: string,
    createdAt: string,
    tags: string,
    id: number,
    listId: number
}