'use client'
import React, { useState } from 'react'
import { BASE_API_URL } from '@/app/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {ITodo} from "@/app/interfaces"
import { FunctionComponent} from 'react'
import { BsPencil, BsFillTrash2Fill } from "react-icons/bs";

const ListTodos: FunctionComponent<{items: ITodo[], listId: number}> = ({items = [], listId}) => {
  const [todos, setTodos] = useState<ITodo[]>(items)
  const validTodos = Array.isArray(todos) && todos.length > 0
  const router = useRouter()
  
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, listId: number, todoId: number) => {
    const res = await fetch(BASE_API_URL + '/lists/' + listId + '/todos/' + todoId, {
      method: 'DELETE',
    })
    if (res.ok) {
      setTodos(todos.filter(todo => todo.id !== todoId))
      router.refresh()
    } else {
      alert('Failed to delete the list item.')
    }
  }

  return (
    <>
      { validTodos ? (
        <ul>
          {todos.map(todo =>
            <li key={todo.id} className='p-2 border-b hover:border-b-2'>
              <div className='flex justify-between'>
                <span className='block text-lg font-semibold'>{todo.name}</span>
                <div className='flex justify-center items-center'>
                  <Link className='inline-block mr-3 hover:scale-125 hover:text-blue-700 transition-all' href={"/lists/" + todo.listId + "/todos/" + todo.id + "/edit"}>
                    <BsPencil />
                  </Link>
                  <button className='inline-block hover:scale-125 hover:text-blue-700 transition-all' onClick={e => handleDelete(e, todo.listId, todo.id)}>
                    <BsFillTrash2Fill />
                  </button>
                </div>
              </div>
              <div className='text-left'>Created at: {todo.createdAt}</div>
              <div className='text-left'>Due date: {todo.dueDate}</div>
              <div className='text-left'>Complete: <input type="checkbox" checked={todo.complete} disabled /></div>
              <div className='text-left'>Priority: {todo.priority}</div>
              <div className='text-left'>Tags: {todo.tags}</div>
            </li>
          )}
        </ul>
      ) : (
        <p>No todo items found in the list.</p>
      )}
    </>
  )
}

export default ListTodos