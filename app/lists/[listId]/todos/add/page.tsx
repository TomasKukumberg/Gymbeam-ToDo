'use client'
import { BASE_API_URL } from '@/app/constants'
import React, { useState, useEffect } from 'react'
import { FunctionComponent} from 'react'
import { useRouter } from 'next/navigation'
import { IoSaveOutline } from "react-icons/io5";
import BackButton from '@/app/components/BackButton';
import { IList } from '@/app/interfaces'

const AddTodo: FunctionComponent<{params: { listId: number }}> = ({params}) => {
    const [listName, setListName] = useState('')
    const [name, setName] = useState('')
    const [complete, setComplete] = useState(false)
    const [priority, setPriority] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [tags, setTags] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(BASE_API_URL + '/lists/' + params.listId + '/todos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name: name, complete: complete, priority: priority, dueDate: dueDate, createdAt: createdAt, tags: tags})
        })
        if (res.ok) {
            router.push('/lists/' + params.listId)
            router.refresh()
        } else {
            alert('Failed to add a list item.')
        }
    }

    useEffect( () => {
        const fetchData = async() => {
            const res = await fetch(BASE_API_URL + '/lists/' + params.listId)
            const list: IList = await res.json()
            setListName(list.name)
        }
        fetchData();
    }, [])

    return (
        <div className='container mx-auto mt-10 p-2 pt-4 pb-8 h-90vh bg-white rounded-lg shadow-md font-mono'>
            <div className='mx-auto max-w-sm mb-2'>
                <BackButton url={`/lists/${params.listId}`}/>
            </div>
            <h1 className='mx-auto max-w-sm font-mono text-2xl font-semibold mb-12'>Add item to list "{listName}"</h1>
            <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
                <div className="mb-5">
                    <label htmlFor="name" className='block mb-2 text-sm font-medium'>Name</label>
                    <input type="text" onChange={e => setName(e.target.value)} value={name} id="name" className='input-primary' />
                </div>

                <div className="mb-5">
                    <label htmlFor="complete" className='block mb-2 text-sm font-medium'>Complete</label>
                    <input type="checkbox" onChange={e => setComplete(e.target.checked)} checked={complete} id="complete" />    
                </div>

                <div className="mb-5">
                    <label htmlFor="priority" className='block mb-2 text-sm font-medium'>Choose a priority:</label>
                    <select id="priority" onChange={e => setPriority(e.target.value)} value={priority} className='input-primary'>
                        <option value="">--Please choose an option--</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="dueDate" className='block mb-2 text-sm font-medium'>Due date</label>
                    <input type="date" onChange={e => setDueDate(e.target.value)} value={dueDate} id="dueDate" className='input-primary' />
                </div>

                <div className="mb-5">
                    <label htmlFor="createdAt" className='block mb-2 text-sm font-medium'>Created at</label>
                    <input type="date" onChange={e => setCreatedAt(e.target.value)} value={createdAt} id="createdAt" className='input-primary' />
                </div>

                <div className="mb-5">
                    <label htmlFor="tags" className='block mb-2 text-sm font-medium'>Tags</label>
                    <textarea id="tags" rows={5} cols={33} onChange={e => setTags(e.target.value)} value={tags} className='input-primary' />
                </div>
                
                <button type="submit" className='inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white text-right font-bold py-2 px-4 rounded hover:scale-110 transition-all'>
                    Save list item
                    <IoSaveOutline className='ml-2'/>
                </button>
            </form>
        </div>
    )
}

export default AddTodo