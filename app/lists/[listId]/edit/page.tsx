'use client'
import { BASE_API_URL } from '@/app/constants'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FunctionComponent} from 'react'
import BackButton from '@/app/components/BackButton'
import { IoSaveOutline } from "react-icons/io5";
import { IList } from '@/app/interfaces'

const EditListItem: FunctionComponent<{params: { listId: number }}> = ({params}) => {
    const [listItem, setListItem] = useState<IList>()
    const [listName, setListName] = useState('')
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(BASE_API_URL + '/lists/' + listItem?.id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({id: listItem?.id, createdAt: listItem?.createdAt, name: listName})
        })
        if (res.ok) {
            router.push('/lists')
            router.refresh()
        } else {
            alert('Failed to edit the list.')
        }
    }
  
    useEffect( () => {
        const fetchData = async() => {
            const res = await fetch(BASE_API_URL + '/lists/' + params.listId)
            const listItem: IList = await res.json()
            setListItem(listItem)
            setListName(listItem.name)
        }

        fetchData();
    }, [])
  
    return (
        <div className='container mx-auto mt-10 p-2 pt-4 pb-8 h-90vh bg-white rounded-lg shadow-md overflow-auto font-mono'>
                <div className='mx-auto max-w-sm mb-2'>
                    <BackButton url='/lists/'/>
                </div>
                <h1 className='mx-auto max-w-sm font-mono text-2xl font-semibold mb-12'>Edit List</h1>
                <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
                    <div className="mb-5">
                        <label htmlFor="listName" className='block mb-2 text-sm font-medium'>List name</label>
                        <input type="text" id="listName" value={listName} onChange={e => setListName(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' autoFocus/>
                    </div>
                    
                    <button type="submit" className='inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white text-right font-bold py-2 px-4 rounded hover:scale-110 transition-all'>
                        Save list
                        <IoSaveOutline className='ml-2'/>
                    </button>
                </form>
        </div>
  )
}

export default EditListItem