import React, { useEffect, useState } from 'react'
import { getuser } from '../api/authrization.js';
import { Link } from 'react-router-dom';
function CardComponent({ post }) {
  const [owner, setOwner] = useState();
  const finduser = async () => {
    try {
      const response = await getuser(post.owner);
      setOwner(response.data.user.username);
    } catch (error) {
    console.log(error)  
    }
  
  }
  useEffect(() => {
   finduser(); 
  },[])
  return (
    <>
      <Link to={`/openPost/${post._id}`}>
        <div className="w-64 border border-black p-4 rounded shadow m-3 bg-white cursor-pointer">
          <div h-20>
            <img
              className="h-[100px] w-[100%] rounded-md shadow-md"
              src="https://images.unsplash.com/photo-1682687221006-b7fd60cf9dd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
              alt="thsis is image"
            ></img>
            {/* <img src={post.image.url}></img> */}
          </div>
          <span className="font-semibold text-blue-600">Owner: {post.owner?.name || "Anonymous"}</span>
          <h2 className="text-lg font-semibold"> {post.title}</h2>
          <p className="text-sm text-gray-600">{post.description}</p>
        </div>
      </Link>
    </>
  );
}

export default CardComponent
