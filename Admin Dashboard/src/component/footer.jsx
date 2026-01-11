import React from 'react'
import Logo from '../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse ,faNoteSticky,faSquarePollVertical,faGamepad,faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function footer() {
  return (
    <>
    <div className='mt-[100px] bottom-0 left-0  justify-around px-4 py-6  md:flex   text-gray-700'>
     <div className='md:w-1/3 px-3 '>
      <div className='flex items-center'>
                <img src={Logo} alt="Logo" className="h-8 w-8 rounded-full " />
                  <h1  className="text-1xl font-bold p-3  px-3  md:block">CampusConnect</h1>
        </div>
      <p className='md:px-3 md:py-3'>One Stop Solution for Students.Discover results, notes, community, and jobs—tailored for university students across India.</p>
     </div>
     <hr className='md:hidden m-3 w-full' />
     <div className='md:w-1/3'>
      <h3 className='font-bold '>Contact</h3>
      <span className='hover:text-blue-400 cursor-pointer transition-all duration-200'>Email: info@campusconnect.com</span>
      <br />
      <span className='hover:text-blue-400 cursor-pointer transition-all duration-200'>Phone: +91 12345 67890</span>
      <br />
      
     </div>
    </div>

     <hr className='md:block m-3 w-full  px-3' />
    <div className='flex md:block justify-between items-center px-3 py-2 w-full text-center'>
     
        <p>© 2024 CampusConnect. All rights reserved.  </p>
     
     
    </div>
     </>
  )
}

export default footer
