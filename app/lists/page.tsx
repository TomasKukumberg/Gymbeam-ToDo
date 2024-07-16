import React from 'react'
import { List } from '@/app/interfaces'
import { BASE_API_URL } from '@/app/constants'
import Link from 'next/link'
import ListItems from '@/app/components/ListItems'

const ListsPage = async () => {
    const res = await fetch(BASE_API_URL + '/lists', {cache: 'no-store'})
    const lists: List[] = await res.json()
  return (
        <>
            <div>Lists Page</div>
            <Link href="/lists/add">Add new list</Link>
            <ListItems lists={lists} />
        </>
  )
}

export default ListsPage