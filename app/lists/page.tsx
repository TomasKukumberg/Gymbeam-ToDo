import React from 'react'
import { IList } from '@/app/interfaces'
import { BASE_API_URL } from '@/app/constants'
import Link from 'next/link'
import ListItems from '@/app/components/ListItems'
import { BsFileEarmarkPlus } from "react-icons/bs"

const ListsPage = async () => {
    const res = await fetch(BASE_API_URL + '/lists', {cache: 'no-store'})
    const lists: IList[] = await res.json()
    const validLists = Array.isArray(lists) && lists.length > 0
    
    return (
      <div className='container mx-auto text-center mt-10 p-1 md:p-8 h-90vh bg-white rounded-lg shadow-md overflow-auto font-mono'>
        <Link href="/lists/add" className='btn-primary m-8'>
          <BsFileEarmarkPlus className='mr-2' />
          <span>Add new list</span>
        </Link>
        <h1 className='text-left p-2 font-mono text-2xl font-semibold'>Your lists</h1>
        { validLists ? (
          <ListItems lists={lists} />
        ) : (
          <p>No lists found.</p>
        )}
      </div>
    )
}

export default ListsPage