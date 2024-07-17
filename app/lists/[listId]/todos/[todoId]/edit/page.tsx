'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BASE_API_URL } from '@/app/constants'
import { FunctionComponent} from 'react'
import { IoSaveOutline } from "react-icons/io5";
import BackButton from '@/app/components/BackButton';
import { ITodo } from '@/app/interfaces'

const EditTodoPage: FunctionComponent<{params: { listId: number, todoId: number }}> = ({params}) => {
    const [todoItem, setTodoItem] = useState<ITodo>()
    const [todoName, setTodoName] = useState('')
    const [todoCreatedAt, setTodoCreatedAt] = useState('')
    const [todoDueDate, setTodoDueDate] = useState('')
    const [todoComplete, setTodoComplete] = useState(false)
    const [todoPriority, setTodoPriority] = useState('')
    const [todoTags, setTodoTags] = useState('')
    const router = useRouter()

    useEffect( () => {
        const fetchData = async() => {
            const res = await fetch(BASE_API_URL + '/lists/' + params.listId + '/todos/' + params.todoId)
            const todoItemRes: ITodo = await res.json()
            if (res.ok) {
                setTodoItem(todoItemRes)
                setTodoName(todoItemRes.name)
                setTodoCreatedAt(todoItemRes.createdAt)
                setTodoDueDate(todoItemRes.dueDate)
                setTodoComplete(todoItemRes.complete)
                setTodoPriority(todoItemRes.priority)
                setTodoTags(todoItemRes.tags)
            } else {
                alert('Failed to edit the list item.')
            }
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
                id: todoItem?.id, 
                listId: todoItem?.listId, 
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
        <div className='container mx-auto mt-10 p-2 pt-4 pb-8 h-90vh bg-white rounded-lg shadow-md overflow-auto font-mono'>
            <div className='mx-auto max-w-sm mb-2'>
                <BackButton url={`/lists/${params.listId}`}/>
            </div>
            <h1 className='mx-auto max-w-sm font-mono text-2xl font-semibold mb-12'>Edit list item</h1>
            <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
                <div className="mb-5">
                    <label htmlFor="todoName" className='block mb-2 text-sm font-medium'>Name</label>
                    <input type="text" value={todoName} onChange={e => setTodoName(e.target.value)} id="todoName" className='input-primary' />
                </div>

                <div className="mb-5">
                    <label htmlFor="todoCreatedAt" className='block mb-2 text-sm font-medium'>Created at</label>
                    <input type="date" value={todoCreatedAt} onChange={e => setTodoCreatedAt(e.target.value)} id="todoCreatedAt" className='input-primary' />
                </div>

                <div className="mb-5">
                    <label htmlFor="todoDueDate" className='block mb-2 text-sm font-medium'>Due date</label>
                    <input type="date" value={todoDueDate} onChange={e => setTodoDueDate(e.target.value)} id="todoDueDate" className='input-primary' />
                </div>

                <div className="mb-5">
                    <label htmlFor="todoComplete" className='block mb-2 text-sm font-medium'>Complete</label>
                    <input type="checkbox" checked={todoComplete} onChange={e => setTodoComplete(e.target.checked)} id="todoComplete"  />
                </div>

                <div className="mb-5">
                    <label htmlFor="todoPriority" className='block mb-2 text-sm font-medium'>Choose a priority:</label>
                    <select id="todoPriority" value={todoPriority} onChange={e => setTodoPriority(e.target.value)} className='input-primary'>
                        <option value="">--Please choose an option--</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="todoTags" className='block mb-2 text-sm font-medium'>Tags</label>
                    <textarea id="todoTags" rows={5} cols={33} value={todoTags} onChange={e => setTodoTags(e.target.value)} className='input-primary'></textarea>
                </div>
                
                <button type="submit" className='btn-primary'>
                    Save list item
                    <IoSaveOutline className='ml-2'/>
                    </button>
            </form>
        </div>
    )
}

export default EditTodoPage