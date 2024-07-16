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
    await fetch(BASE_API_URL + '/lists/' + listId, {
      method: 'DELETE'
    })
    setItems(items.filter((item: IList) => item.id !== listId))
    router.refresh()
  }
  
  return (
    <>
        <ul>
            {items.map((item: IList) => 
            <li key={item.id} className='flex justify-between p-2 border-b'>
              <Link href={'/lists/' + item.id}>
                <span>{item.name}</span>
              </Link>
              <div className='flex justify-center items-center'>
                <Link href={"/lists/" + item.id + "/edit"} className='mr-3'>
                  <BsPencil />
                </Link>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <BsFillTrash2Fill />
                </button>
              </div>
            </li>)}
        </ul>
    </>
  )
}

export default ListItems