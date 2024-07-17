import React from 'react'
import { IList, ITodo } from '@/app/interfaces'
import { BASE_API_URL } from '@/app/constants'
import ListTodos from '@/app/components/ListTodos'
import { FunctionComponent} from 'react'
import { BsFileEarmarkPlus } from "react-icons/bs"
import Link from 'next/link'
import BackButton from '@/app/components/BackButton'

const ListPage: FunctionComponent<{params: { listId: number }}> = async ({params}) => {
    const res = await fetch(BASE_API_URL + '/lists/' + params.listId + '/todos/', {cache: 'no-store'})
    const items: ITodo[] = await res.json()
    const listRes = await fetch(BASE_API_URL + '/lists/' + params.listId)
    const list: IList = await listRes.json()
    
    return (
        <div className='container mx-auto text-center mt-10 p-1 md:p-8 h-90vh bg-white rounded-lg shadow-md overflow-auto font-mono'>
            <Link href={"/lists/" + params.listId + "/todos/add/"} className='btn-primary m-8'>
                <BsFileEarmarkPlus className='mr-2' />
                <span>Add todo item</span>
            </Link>
            <BackButton url='/lists/' classes='ml-2'/>
            <h1 className='text-left p-2 font-mono text-2xl font-semibold'>{list.name}</h1>
            <ListTodos items={items} listId={params.listId} />
        </div>
    )
}

export default ListPage