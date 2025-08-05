import React, { useEffect, useState } from 'react'
import { viewOne } from '../api/community.js'
import { useParams } from "react-router-dom";
import CommunityHeader from './communityHeader.js';
import { FaHeart, FaRegHeart, FaComment, FaShareAlt } from "react-icons/fa";
import { BASE_URL } from "../api/api.js";
function OpenPost() {
  const { id } = useParams();
  const [post,setPost]=useState("")
  const fetchData = async () => {
    const response = await viewOne(id);
    setPost(response.data.post)
    console.log(response.data);
  }

  const handleShare = () => {
  const url = `${BASE_URL}openPost/${id}`;
    navigator.clipboard
      .writeText(url)
      .catch((err) => {
        console.error("Failed to copy link: ", err);
    });
  }
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
     { user: "Ravi", text: "Nice post! 🎉" },
     { user: "Simran", text: "Loved it! ❤️" },
   ]);

  useEffect(() => {
    fetchData();
  },[])
 return (
   <>
     <div className="mt-20 ml-10">
       <CommunityHeader />

       <div>
         {/* Title */}
         <h3 className="font-extrabold text-2xl mb-4">{post.title}</h3>

         {/* Image */}
         <img
           className="h-[300px] w-[80%] object-cover rounded-md shadow-md"
           src={
             "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
           }
           alt={post.title || "Post Image"}
         />
         <span className="font-semibold text-blue-600">
           Owner: {post.owner?.name || "Anonymous"}
         </span>

         {/* Description */}
         <p className="mt-4 text-gray-700 leading-relaxed">
           {post.description}
         </p>
         <hr className='mt-4' />
         {/* Action Buttons */}
         <div className="flex items-center space-x-6 mt-4 text-2xl">
           <button className="text-red-500">
             {liked ? <FaHeart /> : <FaRegHeart />}
           </button>
           <button className="text-blue-500">
             <FaComment />
           </button>
           <button className="text-green-500" onClick={handleShare}>
             <FaShareAlt />
           </button>
         </div>
         {/* Add New Comment */}
         <div className="mt-6 flex space-x-2">
           <input
             type="text"
             placeholder="Add a comment..."
             className="flex-1 border border-gray-300 rounded px-3 py-1"
           />
           <button className="bg-blue-500 text-white px-4 py-1 rounded">
             Post
           </button>
         </div>
         {/* Comments Section */}
         <div className="mt-6">
           <h4 className="font-semibold text-lg mb-2">Comments</h4>
           {comments.length === 0 ? (
             <p className="text-gray-500">No comments yet.</p>
           ) : (
             <ul className="space-y-2">
               {comments.map((c, index) => (
                 <li
                   key={index}
                   className="border border-gray-200 rounded p-2 bg-gray-50"
                 >
                   <span className="font-bold">{c.user}: </span>
                   {c.text}
                 </li>
               ))}
             </ul>
           )}
         </div>
       </div>
     </div>
   </>
 );
}

export default OpenPost
