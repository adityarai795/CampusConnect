import React from 'react'
import compassIcon from '../assets/compass-svgrepo-com.svg';

function Card({ title }) {
  return (
    // <div className='w-[300px]   border-2 rounded-md p-4 m-12   bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center'>
    //   <div className='w-1/2 h-1/2 flex items-center justify-center mb-4  bg-blue-200  rounded-md p-1'>
    //     <img  src={compassIcon} alt='Card image' className='w-20  object-cover rounded-md mb-2' />
    //   </div>
    //   <div className='w-1/2 h-1/2 flex items-center justify-center mb-4 m-1'>
    //     <h2 className='text-xl font-bold mb-2'>{title}</h2>
    //   </div>

    // </div>
    <div className="w-[300px] border-2 rounded-lg p-4 m-6 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      {/* Card Content */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-16 h-16 bg-blue-100 rounded-md flex items-center justify-center">
          <img
            src={compassIcon}
            alt="Card icon"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Text Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-800 mb-1">{title}</h2>
          <p className="text-sm text-gray-600">
            category JobType
          </p>
          <p className="text-sm text-gray-500">city</p>
        </div>
      </div>
    </div>
  );
}

export default Card
