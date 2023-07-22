import React, {FC, useState, useEffect} from 'react'
import * as Icons from '@heroicons/react/24/outline'
import { instance } from '../constants/Axios';
import { useNavigate, useLocation } from 'react-router-dom'

interface Post{
  id: number;
  title: string;
  body: string;
  userId: number
}

interface User{
  id:	number;
  name: string;
  username: string;	
  email: string	
}

const PostComponent:FC<Post>=({id, title, body, userId}) =>{
  const navigate = useNavigate()
  const [commentaires, setCommentaires] = useState<Post[]>([])
  const [user, setUser] = useState<User | undefined>({
    id: 1,
    name: "",
    username: "",
    email: ""
  })
  const getUser= async()=>{
    const data = await instance.get(`/users/${userId}`).catch((err)=>console.log(err))
    if(data){
      //console.log(data.data)
      setUser(data.data)
    }
  }
  const getCommentaire = async()=>{
    const data = await instance.get(`/comments?postId=${id}`).catch((err)=>console.log(err))
    if(data){
      //console.log(data.data)
      getUser()
      setCommentaires(data.data)
    }
  }

  useEffect(()=>{
    getCommentaire()
    
  }, [user, commentaires])



  return (
    <div onClick={()=> navigate(`/posts/${id}`, {state: {id, title, body, userId, name: user?.name, email: user?.email, username: user?.username}})} className="flex flex-col sm:w-1/2 md:w-[400px] bg-white m-2 cursor-pointer hover:scale-105 duration-500 transition-all">
      <div className="card-header">
        <div className="flex items-center">
          <Icons.UserCircleIcon className="w-12 h-12" />
          <div className="flex flex-col">
            <span className="text-sm">{user?.email}</span>
            <span className="text-sm">{user?.username}</span>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p>{body.slice(0,150).toLowerCase()}...</p>
      </div>
      <div className="card-footer flex items-center ">
        
          <div className="relative">
          <Icons.ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
          <div className="w-4 h-4 flex items-center justify-center rounded-full -right-1 bottom-1 bg-gray-700 text-white absolute text-[9px]">
            {commentaires?.length}
          </div>
          </div>{" "}
          <span className="text-xs px-1">commentaires</span>
          <div className='flex-1 ml-4 relative'>
               <input type='text' placeholder='votre commentaire' className='w-full text-sm pl-2 py-2 rounded-full bg-gray-100  ' />
               <Icons.PaperAirplaneIcon className="w-6 h-6 absolute right-1 bottom-1" />
          </div>
       
        
      </div>
    </div>
  );
}

export default PostComponent
