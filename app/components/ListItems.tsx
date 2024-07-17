'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { BASE_API_URL } from '../constants'
import { useRouter } from 'next/navigation'
import {IList} from '@/app/interfaces'
import { FunctionComponent} from 'react'
import { BsPencil } from "react-icons/bs";
import { BsFillTrash2Fill } from "react-icons/bs";

const ListItems: FunctionComponent<{lists: IList[]}> = ({lists} ) => {
  const [items, setItems] = useState(lists);
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, listId: number) => {
    e.preventDefault();

    /* Delete list items first. */
    const resp = await fetch(BASE_API_URL + '/lists/' + listId + '/todos')
    const todos = await resp.json()
    for (const todo of todos) {
      await fetch(BASE_API_URL + '/lists/' + listId + '/todos/' + todo.id, {
        method: 'DELETE'
      })
    }
    
    /* After items are deleted, we can now safely delete the list itself. */
    const res = await fetch(BASE_API_URL + '/lists/' + listId, {
      method: 'DELETE'
    })
    if (res.ok) {
      setItems(items.filter((item: IList) => item.id !== listId))
      router.refresh()
    } else {
      alert('Failed to delete the list.')
    }
  }
  
  return (
    <ul className='font-mono'>
        {items.map((item: IList) => 
        <li key={item.id} className='flex justify-between p-2 border-b hover:border-b-2'>
          <Link href={'/lists/' + item.id} className='hover:scale-105 hover:text-blue-700 transition-all duration-300'>
            <span>{item.name}</span>
          </Link>
          <div className='flex justify-center items-center'>
            <Link href={"/lists/" + item.id + "/edit"} className='mr-3 hover:scale-125 hover:text-blue-700 transition-all'>
              <BsPencil />
            </Link>
            <button onClick={e => handleDelete(e, item.id)} className='hover:scale-125 hover:text-blue-700 transition-all'>
              <BsFillTrash2Fill />
            </button>
          </div>
        </li>)}
    </ul>
  )
}

export default ListItems