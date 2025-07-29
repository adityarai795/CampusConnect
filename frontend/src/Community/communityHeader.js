import React from 'react'
import { Link } from "react-router-dom";
function communityHeader() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4 mx-5">
      <div className="flex gap-4">
        <Link>All Post</Link>
        <Link>My Post</Link>
      </div>
      <div>
        <Link className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
          {" "}
          Create Post
        </Link>
      </div>
    </div>
  );
}

export default communityHeader
