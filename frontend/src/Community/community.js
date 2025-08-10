import React, { useEffect, useState } from "react";
import { viewAllPost } from "../api/community.js";
import axios from "axios";
import CardComponent from "./CardComponent";
import CommunityHeader from "./communityHeader.js";
import { toast } from "react-toastify";
function Community() {
  const [posts, setPosts] = useState([]);
  // Component names should be PascalCase
  const getDatatobackend = async () => {
    try {
      const response = await viewAllPost();
      setPosts(response.data.posts);
      // console.log(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getDatatobackend();
  }, []);

  return (
    <div className="bg-gray-100 pt-20 pb-10 ">
      <CommunityHeader />
      <div>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          <ul className="flex flex-wrap items-center justify-center">
            {posts.map((post, index) => (
              <li key={index}>
                <CardComponent post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* <Card /> */}
    </div>
  );
}

export default Community;
