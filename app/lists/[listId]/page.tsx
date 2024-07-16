import React from 'react'
import { ITodo } from '@/app/interfaces'
import { BASE_API_URL } from '@/app/constants'
import ListTodos from '@/app/components/ListTodos'
import { FunctionComponent} from 'react'

const ListPage: FunctionComponent<{params: { listId: number }}> = async ({params}) => {
    const res = await fetch(BASE_API_URL + '/lists/' + params.listId + '/todos/', {cache: 'no-store'})
    const items: ITodo[] = await res.json()
    
    return (
        <>
            <div>ListPage {params.listId}</div>
            <ListTodos items={items} listId={params.listId} />
        </>
    )
}

export default ListPage