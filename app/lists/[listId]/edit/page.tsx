'use client'
import { BASE_API_URL } from '@/app/constants'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const EditListItem = ({params}) => {
    const [listItem, setListItem] = useState({id: '', name: '', createdAt: ''})
    const [listName, setListName] = useState('')
    const router = useRouter()

    const handleClick = async(e) => {
        e.preventDefault()
        const res = await fetch(BASE_API_URL + '/lists/' + listItem.id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({id: listItem.id, createdAt: listItem.createdAt, name: listName})
        })
        router.push('/lists')
        router.refresh()
    }
  
    useEffect( () => {
        const fetchData = async() => {
            const res = await fetch(BASE_API_URL + '/lists/' + params.listId)
            const listItem = await res.json()
            setListItem(listItem)
            setListName(listItem.name)
        }

        fetchData();
    }, [])
  
    return (
    <>
        <div>Edit List</div>
        <label htmlFor="listName">List name</label>
        <input type="text" id="listName" value={listName} onChange={(e) => setListName(e.target.value)} />
        <button onClick={handleClick}>Save list</button>
    </>
  )
}

export default EditListItem