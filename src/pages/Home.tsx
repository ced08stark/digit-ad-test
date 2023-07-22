import React, {useState, useEffect, FC} from 'react'
import PostComponent from '../components/PostComponent'
import { instance } from '../constants/Axios'
import * as Icons from '@heroicons/react/24/outline'

interface Post{
  id: number;
  title: string;
  body: string;
  userId: number;
};

function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState<string>("")

  const getPost = async() =>{
    const data = await instance.get('/posts').catch((err)=>console.log(err))
    if(data){
      console.log(data.data)
      setPosts(data.data)
    }
  }

  useEffect(()=>{
      getPost();
  }, [])

  return (
    <div className='m-3'>
      <div className='relative'>
          <Icons.MagnifyingGlassIcon className="w-6 h-6 absolute bottom-2 left-2 text-gray-400" />
           <input type='text' placeholder='votre recherche' onChange={(e)=>setSearch(e.target.value)} className='w-full rounded-full pl-10 py-2' />
            <Icons.AdjustmentsHorizontalIcon className="w-6 h-6 absolute bottom-2 right-2 text-gray-400" />
      </div>
       <div className='flex flex-wrap justify-between m-3'>
      
      {posts?.filter((post) => post.title.includes(search))?.
      map((item, index)=>(
          <PostComponent id={item.id} title={item.title} body={item.body} userId={item.userId} />
      ))
      }
      
      
      
    </div>

    </div>
   
  )
}

export default Home
