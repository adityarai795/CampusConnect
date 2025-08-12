import React, { useEffect, useState } from 'react'
import { getuser } from '../api/authrization.js';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function CardComponent({ post }) {
  const [owner, setOwner] = useState();
  const finduser = async () => {
    try {
      const response = await getuser(post.owner);
      setOwner(response.data.user.username);
    } catch (error) {
      console.log(error) 
      toast.error(error.response.data.message);  
    }
  }
  useEffect(() => {
   finduser(); 
  },[])
  return (
    <>
     
        <div className="border border-gray-300 p-4 rounded-lg shadow-md m-3 bg-white cursor-pointer flex flex-col justify-between">
          <Link to={`/openPost/${post._id}`}> {/* Image Section */}
          <div className="h-[150px] w-full overflow-hidden rounded-md shadow-md">
            <img
              className="h-full w-full object-cover"
              src={post?.image?.url}
              alt="Post"
            />
          </div>

          <div className="mt-3 flex-1">
            <span className="block font-semibold text-blue-600 text-sm mb-1">
              Owner: {post.owner?.username || "Anonymous"}
            </span>
            <h2 className="text-lg font-bold leading-snug">{post.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-3">
              {post.description}
            </p>
          </div>
           </Link>
          <div className="mt-4 flex justify-between items-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow">
              👍 Like
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-full shadow">
              💬 Comment
            </button>
          </div>
        </div>
    </>
  );
}

export default CardComponent
