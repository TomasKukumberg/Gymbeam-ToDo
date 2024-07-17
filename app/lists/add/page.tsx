'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { BASE_API_URL } from '@/app/constants';
import { IoSaveOutline } from "react-icons/io5";
import BackButton from '@/app/components/BackButton';

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
        if (res.ok) {
            router.push('/lists')
            router.refresh()
        } else {
            alert('Failed to add a list.')
        }
    }

    return (
        <div className='container mx-auto mt-10 p-2 pt-4 pb-8 h-90vh bg-white rounded-lg shadow-md overflow-auto font-mono'>
            <div className='mx-auto max-w-sm mb-2'>
                <BackButton url='/lists/'/>
            </div>
            <h1 className='mx-auto max-w-sm font-mono text-2xl font-semibold mb-12'>Add list</h1>
            <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
                <div className="mb-5">
                    <label htmlFor="listName" className='block mb-2 text-sm font-medium'>List name</label>
                    <input type="text" id="listName" value={listName} onChange={e => setListName(e.target.value)} className='input-primary' autoFocus/>
                </div>
                
                <button type="submit" className='btn-primary'>
                    Save list
                    <IoSaveOutline className='ml-2'/>
                    </button>
            </form>
        </div>
    )
}

export default ListAdd