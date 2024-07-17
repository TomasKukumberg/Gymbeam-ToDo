'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from "react-icons/fa6"
import { FunctionComponent} from 'react'

const BackButton: FunctionComponent<{classes?: string, url: string}> = ({classes, url}) => {
    const router = useRouter()
    
    return (
        <FaArrowLeft onClick={() => router.push(url)} className={`${classes} hover:cursor-pointer hover:-translate-x-px`}/>
    )
}

export default BackButton