import React from 'react'
import { List, Item } from '@/app/interfaces'
import { BASE_API_URL } from '@/app/constants'
import ListTodos from '@/app/components/ListTodos'

const ListPage = async ({params}) => {
    const res = await fetch(BASE_API_URL + '/lists/' + params.listId + '/todos/', {cache: 'no-store'})
    const items: Item[] = await res.json()
    
    return (
        <>
            <div>ListPage {params.listId}</div>
            <ListTodos items={items} listId={params.listId} />
        </>
    )
}

export default ListPage