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
      <div className="w-full sm:w-[300px] md:w-[350px] min-h-[350px] border border-gray-300 p-4 rounded-lg shadow-md m-3 bg-white cursor-pointer flex flex-col justify-between transition-transform transform hover:scale-[1.02] hover:shadow-lg duration-300">
        <Link to={`/openPost/${post._id}`} className="flex flex-col flex-1">
          {/* Image Section - Render only if image exists */}
          {post?.image?.url ? (
            <div className="h-[180px] w-full overflow-hidden rounded-md shadow-md flex items-center justify-center bg-gray-100">
              <img
                className="h-full w-full object-cover"
                src={post?.image?.url}
                alt="Post"
              />
            </div>
          ) : null}

          {/* Content Section */}
          <div
            className={`mt-3 flex-1 flex flex-col ${
              !post?.image?.url ? "mt-0" : ""
            }`}
          >
            <span className="font-semibold text-blue-600 text-sm mb-1">
              Owner: {post.owner?.username || "Anonymous"}
              {" | "}
              {post.collage || "N/A"}
            </span>

            <h2 className="text-lg font-bold leading-snug mb-1">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-3 flex-1">
              {post.description}
            </p>
          </div>
        </Link>

        {/* Action Buttons */}
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
