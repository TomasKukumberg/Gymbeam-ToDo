'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BASE_API_URL } from '@/app/constants'
import { FunctionComponent} from 'react'

const EditTodoPage: FunctionComponent<{params: { listId: number, todoId: number }}> = ({params}) => {
    const [todoItem, setTodoItem] = useState({id: '', listId: '', name: '', createdAt: '', dueDate: '', complete: '', priority: '', tags: ''})
    const [todoName, setTodoName] = useState('')
    const [todoCreatedAt, setTodoCreatedAt] = useState('')
    const [todoDueDate, setTodoDueDate] = useState('')
    const [todoComplete, setTodoComplete] = useState('')
    const [todoPriority, setTodoPriority] = useState('')
    const [todoTags, setTodoTags] = useState('')
    const router = useRouter()

    useEffect( () => {
        const fetchData = async() => {
            const res = await fetch(BASE_API_URL + '/lists/' + params.listId + '/todos/' + params.todoId)
            const todoItemRes = await res.json()
            setTodoItem(todoItemRes)
            setTodoName(todoItemRes.name)
            setTodoCreatedAt(todoItemRes.createdAt)
            setTodoDueDate(todoItemRes.dueDate)
            setTodoComplete(todoItemRes.complete)
            setTodoPriority(todoItemRes.priority)
            setTodoTags(todoItemRes.tags)
        }

        fetchData();
    }, [])

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch(BASE_API_URL + '/lists/' + params.listId + '/todos/' + params.todoId, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: todoItem.id, 
                listId: todoItem.listId, 
                name: todoName, 
                createdAt:todoCreatedAt, 
                dueDate: todoDueDate, 
                complete: todoComplete, 
                priority: todoPriority, 
                tags: todoTags 
            })
        })
        router.push('/lists/' + params.listId)
        router.refresh()
    }
  
    return (
        <>
            <div>Edit todo</div>
        
            <form onSubmit={handleSubmit}>
                <label htmlFor="todoName">Name</label>
                <input type="text" value={todoName} onChange={(e) => setTodoName(e.target.value)} id="todoName" />

                <label htmlFor="todoCreatedAt">Created at</label>
                <input type="date" value={todoCreatedAt} onChange={(e) => setTodoCreatedAt(e.target.value)} id="todoCreatedAt" />

                <label htmlFor="todoDueDate">Due date</label>
                <input type="date" value={todoDueDate} onChange={(e) => setTodoDueDate(e.target.value)} id="todoDueDate" />

                <label htmlFor="todoComplete">Complete</label>
                <input type="text" value={todoComplete} onChange={(e) => setTodoComplete(e.target.value)} id="todoComplete" />

                <label htmlFor="todoPriority">Priority</label>
                <input type="text" value={todoPriority} onChange={(e) => setTodoPriority(e.target.value)} id="todoPriority" />

                <label htmlFor="todoTags">Tags</label>
                <input type="text" value={todoTags} onChange={(e) => setTodoTags(e.target.value)} id="todoTags" />

                <button type='submit'>Save todo</button>
            </form>
        </>
    )
}

export default EditTodoPage