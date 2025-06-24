import React from 'react'
import compassIcon from '../assets/compass-svgrepo-com.svg';

function Card({ title }) {
  return (
    <div className='w-[300px]   border-2 rounded-md p-4 m-12   bg-blue-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center'>
      <div className='w-1/2 h-1/2 flex items-center justify-center mb-4  bg-blue-200  rounded-md p-1'>
        <img  src={compassIcon} alt='Card image' className='w-20  object-cover rounded-md mb-2' />
      </div>
      <div className='w-1/2 h-1/2 flex items-center justify-center mb-4 m-1'>
        <h2 className='text-xl font-bold mb-2'>{title}</h2>
      </div>
      
      
      
    </div>
  )
}

export default Card
