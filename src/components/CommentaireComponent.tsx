import React, {FC} from 'react'
import * as Icons from '@heroicons/react/24/outline'
import { instance } from '../constants/Axios';

interface Commentaire{
    id: number;
    email: string;
    name: string;
    body: string
}

const CommentaireComponent:FC<Commentaire>=({email, body, name})=>{
  return (
        <div className="flex w-full md:w-1/2 m-2 space-x-2 ">
            <div>
                <Icons.UserCircleIcon className="w-10 h-10 text-gray-400 " />
                
            </div>
            <div className="flex flex-col bg-gray-300 px-4 py-2 rounded-xl">
                <span className='text-xs'>{email}</span>
                <span className="text-sm font-semibold">{name}</span>
                <p className="text-sm ">{body}</p>
            </div>
        </div>
    
  )
}

export default CommentaireComponent