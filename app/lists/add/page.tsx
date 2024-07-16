'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { BASE_API_URL } from '@/app/constants';
import { revalidatePath } from 'next/cache'

const ListAdd = () => {
    const [listName, setListName] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(BASE_API_URL + '/lists/', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name: listName})
        })
        router.push('/lists')
        router.refresh()
    }

    return (
        <>
            <h1>Add list</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="listName">List name</label>
                <input type="text" id="listName" value={listName} onChange={(e) => setListName(e.target.value)} autoFocus/>
                
                <button type="submit">Save list</button>
            </form>
        </>
    )
}

export default ListAdd