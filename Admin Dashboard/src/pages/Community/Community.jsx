import React from 'react'
import { Link } from 'react-router-dom'

function Community() {
  return (
    <div className="col-span-9 p-6 mt-10">
      <h2 className="text-2xl font-semibold">This is the Community Page</h2>
      {/* <link to={"/showallPost"}>showall Post</link> */}
      <Link to={"/showallPost"}>Show allPost</Link>
    </div>
  )
}

export default Community
