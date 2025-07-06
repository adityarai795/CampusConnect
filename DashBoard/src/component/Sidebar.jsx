import React from 'react'
import {Link} from 'react-router-dom'
function Sidebar() {
 return (
    <div className='pt-10 mt-5 w-[200px] bg-gray-100'>
      <ul className='text-center'>
      <Link to={"/home"}><li className='h-16 my-4 py-2 font-bold text-gray-700 hover:text-blue-600 hover:bg-slate-50 cursor-pointer transition'>
       Home
       </li></Link>
       <Link to={"/notes"}><li className='h-16 my-4 py-2 font-bold text-gray-700 hover:text-blue-600 hover:bg-slate-50 cursor-pointer transition'>Notes</li></Link>
       <Link to={"/result"}><li className='h-16 my-4 py-2 font-bold text-gray-700 hover:text-blue-600 hover:bg-slate-50 cursor-pointer transition'>Result</li></Link>
       <Link to={"/community"}> <li className='h-16 my-4 py-2 font-bold text-gray-700 hover:text-blue-600 hover:bg-slate-50 cursor-pointer transition'>Community </li></Link>
       <Link to={"/home"}><li className='h-16 my-4 py-2 font-bold text-gray-700 hover:text-blue-600 hover:bg-slate-50 cursor-pointer transition'>Job</li></Link>
      </ul>
    </div>
  )
}

export default Sidebar


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const navItems = [
//   { label: 'Home',     path: '/'         },
//   { label: 'Notes',    path: '/notes'    },
//   { label: 'Result',   path: '/result'   },
//   { label: 'Community',path: '/community'},
//   // { label: 'Job',      path: '/jobs'  }, // jab route banāo
// ];

// const Sidebar = () => {
//   const { pathname } = useLocation();

//   return (
//     <aside className="w-48 border-r pt-10">
//       <ul className="text-center">
//         {navItems.map(({ label, path }) => (
//           <li key={path}>
//             <Link
//               to={path}
//               className={`
//                 block h-16 my-2 py-2 font-bold transition
//                 ${pathname === path
//                   ? 'text-blue-600 bg-slate-100'
//                   : 'text-gray-700 hover:text-blue-600 hover:bg-slate-50'}
//               `}
//             >
//               {label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;
