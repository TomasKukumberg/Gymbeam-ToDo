'use client'
import React, { useState } from 'react'
import { BASE_API_URL } from '@/app/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {ITodo} from "@/app/interfaces"
import { FunctionComponent} from 'react'

const ListTodos: FunctionComponent<{items: ITodo[], listId: number}> = ({items = [], listId}) => {
  const [todos, setTodos] = useState<ITodo[]>(items)
  const validTodos = Array.isArray(todos) && todos.length > 0
  const router = useRouter()
  
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, listId: number, todoId: number) => {
    await fetch(BASE_API_URL + '/lists/' + listId + '/todos/' + todoId, {
      method: 'DELETE',
    })
    setTodos(todos.filter(todo => todo.id !== todoId))
    router.refresh()
  }

  return (
    <>
      <Link href={"/lists/" + listId + "/todo/add/"}>Add todo item</Link>
      { validTodos ? (
        <ul>
          {todos.map(todo =>
            <li key={todo.id}>
              <span className={todo.complete ? 'block line-through' : 'block'}>{todo.name}</span>
              <Link className='inline-block mr-1' href={"/lists/" + todo.listId + "/todos/" + todo.id + "/edit"}>Edit todo</Link>
              <button className='inline-block' onClick={(e) => handleDelete(e, todo.listId, todo.id)}>Delete todo</button>
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