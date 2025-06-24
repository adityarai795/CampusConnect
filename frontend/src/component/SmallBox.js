import React from 'react'

function SmallBox({bg, text}) {
  return (
    <div className={`${bg} rounded-2xl md:w-[350px] md:h-[150px] w-[200px] h-[100px] mb-5 text-center flex items-center justify-center shadow-sm`}>
      <h5 className='text-white text-xs'>{text}</h5>
    </div>
  )
}

export default SmallBox
