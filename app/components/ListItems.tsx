'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { BASE_API_URL } from '../constants'
import { useRouter } from 'next/navigation'

const ListItems = ({lists}) => {
  const [items, setItems] = useState(lists);
  const router = useRouter()

  const handleDelete = async (e, listId) => {
    e.preventDefault();
    const res = await fetch(BASE_API_URL + '/lists/' + listId, {
      method: 'DELETE'
    })
    setItems(items.filter(item => item.id !== listId))
    router.refresh()
  }
  
  return (
    <>
        <ul>
            {items.map(item => 
            <li key={item.id}>
              <Link href={'/lists/' + item.id}>
                <span>{item.name}</span>
              </Link>
              <Link href={"/lists/" + item.id + "/edit"}>Edit list name</Link>
              <button onClick={(e) => handleDelete(e, item.id)}>Delete list</button>
            </li>)}
        </ul>
    </>
  )
}

export default ListItems