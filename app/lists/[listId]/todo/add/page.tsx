'use client'
import { BASE_API_URL } from '@/app/constants'
import React, { useState } from 'react'
import { FunctionComponent} from 'react'
import { useRouter } from 'next/navigation'

const AddTodo: FunctionComponent<{params: { listId: number }}> = ({params}) => {
    const [name, setName] = useState('')
    const [complete, setComplete] = useState('')
    const [priority, setPriority] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [tags, setTags] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch(BASE_API_URL + '/lists/' + params.listId + '/todos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name: name, complete: complete, priority: priority, dueDate: dueDate, createdAt: createdAt, tags: tags})
        })
        router.push('/lists/' + params.listId)
        router.refresh()
    }

    return (
        <>
            <div>Add Todo for list {params.listId}</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} id="name" />
                
                <label htmlFor="complete">Complete</label>
                <input type="text" onChange={(e) => setComplete(e.target.value)} value={complete} id="complete" />
                
                <label htmlFor="priority">Priority</label>
                <input type="text" onChange={(e) => setPriority(e.target.value)} value={priority} id="priority" />
                
                <label htmlFor="dueDate">Due date</label>
                <input type="text" onChange={(e) => setDueDate(e.target.value)} value={dueDate} id="dueDate" />
                
                <label htmlFor="createdAt">Created at</label>
                <input type="text" onChange={(e) => setCreatedAt(e.target.value)} value={createdAt} id="createdAt" />
                
                <label htmlFor="tags">Tags</label>
                <input type="text" onChange={(e) => setTags(e.target.value)} value={tags} id="tags" />
                
                <button type="submit">Save item</button>
            </form>
        </>
    )
}

export default AddTodo