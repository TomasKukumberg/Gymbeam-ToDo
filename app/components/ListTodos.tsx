'use client'
import React from 'react'
import { useState } from 'react'
import { BASE_API_URL } from '@/app/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ListTodos = ({items, listId}) => {
  const [todos, setTodos] = useState(items)
  const router = useRouter()
  
  const handleDelete = async (e, listId, todoId) => {
    await fetch(BASE_API_URL + '/lists/' + listId + '/todos/' + todoId, {
      method: 'DELETE',
    })
    setTodos(todos.filter(todo => todo.id !== todoId))
    router.refresh()
  }

  /*const handleEdit = async(e, listId, itemId) => {
    setTodos({...todos, {}} )
  }*/

    return (
        <>
            <Link href={"/lists/" + listId + "/todo/add/"}>Add todo item</Link>  
            <ul>
                {todos && todos.map(todo => 
                    <li key={todo.id}>
                      <span className={todo.complete ? 'block line-through' : 'block'}>{todo.name}</span>
                      <Link className='inline-block mr-1' href={"/lists/" + todo.listId + "/todos/" + todo.id + "/edit"}>Edit todo</Link>
                      <button className='inline-block' onClick={(e) => handleDelete(e, todo.listId, todo.id)}>Delete todo</button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default ListTodos