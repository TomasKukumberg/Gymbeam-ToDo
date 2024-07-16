import React from 'react'
import { IList } from '@/app/interfaces'
import { BASE_API_URL } from '@/app/constants'
import Link from 'next/link'
import ListItems from '@/app/components/ListItems'
import { BsFileEarmarkPlus } from "react-icons/bs";

const ListsPage = async () => {
    const res = await fetch(BASE_API_URL + '/lists', {cache: 'no-store'})
    const lists: IList[] = await res.json()
    return (
          <>
              <div className='container mx-auto text-center mt-10 p-2 bg-white rounded-lg'>
                <Link href="/lists/add" className='inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-8 inline-block px-4 rounded'>
                  <BsFileEarmarkPlus className='mr-2' />
                  <span>Add new list</span>
                </Link>
                <ListItems lists={lists} />
              </div>
          </>
    )
}

export default ListsPage