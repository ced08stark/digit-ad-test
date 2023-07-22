import React, {FC, useState, useEffect} from 'react'
import * as Icons from '@heroicons/react/24/outline'
import { instance } from '../constants/Axios';
import { useLocation } from 'react-router-dom'
import CommentaireComponent from '../components/CommentaireComponent';
import PostComponent from '../components/PostComponent';

interface Commentaire{
    id: number;
    email: string;
    name: string;
    body: string
}

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

function PostView() {
    const {state} = useLocation()
    const [commentaires, setCommentaires] = useState<Commentaire[]>([])
    const [posts, setPosts] = useState<Post[]>([])

  const getPost = async() =>{
    const data = await instance.get(`/posts?userId=${state?.userId}`).catch((err)=>console.log(err))
    if(data){
      console.log(data.data)
      setPosts(data.data)
    }
  }

  const [user, setUser] = useState<User | undefined>({
    id: 1,
    name: "",
    username: "",
    email: ""
  })
  const getUser= async()=>{
    const data = await instance.get(`/users/${state.userId}`).catch((err)=>console.log(err))
    if(data){
      //console.log(data.data)
      setUser(data.data)
    }
  }
    const getCommentaire = async()=>{
    const data = await instance.get(`/comments?postId=${state.id}`).catch((err)=>console.log(err))
    if(data){
      console.log(data.data)
      getUser()
      setCommentaires(data.data)
    }
  }

  useEffect(()=>{
    getCommentaire()
    getPost()
    
  }, [])
    
  return (
    <div className='m-3'>
        <span className='text-xl font-bold'>about post</span>
        <div className='flex w-auto items-center flex-col'>
            

<figure className="max-w-screen-md mx-auto text-center">
    <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
    <blockquote>
        <p className="text-2xl italic font-medium text-gray-900 dark:text-white">"{state?.body}"</p>
    </blockquote>
    <figcaption className="flex items-center justify-center mt-6 space-x-3">
        <Icons.UserCircleIcon className="w-6 h-6 rounded-full"  />
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite className="pr-3 font-medium text-gray-900 dark:text-white">{state?.email}</cite>
            <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{state?.email}</cite>
        </div>
    </figcaption>
</figure>
 
            <span className='text-center italic underline'>commentaires</span>
            {
                commentaires?.map((item, index)=>(
                    <CommentaireComponent key={index} id={item.id} name={item.name} email={item.email} body={item.body}  />
                ))
            }
            
           
        </div>
        <span className='text-xl font-bold'>Other post of {user?.username}</span>
        <div className='flex w-full m-3 flex-wrap'>
            {
                posts?.map((item, index)=>(
                     <PostComponent id={item.id} title={item.title} body={item.body} userId={item.userId} />
                ))
            }
        </div>
             
      
    </div>
  )
}

export default PostView
