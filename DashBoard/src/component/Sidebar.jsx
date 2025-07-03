import React from 'react'

function Sidebar() {
  const list = ["Home","Notes", "Result", "Community", "Job"];
 return (
    <div className='pt-10 '>
      <ul className='text-center'>
        {list.map((e,i) => (
           <li className='  h-16 my-4 py-2 font-bold text-gray-700 hover:text-blue-600 hover:bg-slate-50 cursor-pointer transition'key={i} >
            <h3 className='text-xl'> {e}</h3>
           </li>
        ))}
      </ul>
    </div>
  )
} 

export default Sidebar
