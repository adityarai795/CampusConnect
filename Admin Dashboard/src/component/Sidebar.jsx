import React from 'react'
import {Link} from 'react-router-dom'
function Sidebar() {
  const siderbarItems = [
    {name:"Home",path:"/"},
    { name: "Notes", path: "/notes" },
    { name: "Result", path: "/result" },
    { name: "Community", path: "/community" },
    { name: "Job", path: "/jobs" }, 
    { name: "Manage College", path: "/managecollege" },
  ];

 return (
    <div className='pt-10 mt-5 w-[200px] bg-gray-100'>
     <ul className='text-center'>
       {siderbarItems.map((item) => (
         <Link to={item.path} key={item.name}>
           <li className='h-16 my-4 py-2 font-bold text-gray-700 hover:text-blue-600 hover:bg-slate-50 cursor-pointer transition'>
             {item.name}
           </li>
         </Link>
       ))}
      
      </ul>
    </div>
  )
}

export default Sidebar


