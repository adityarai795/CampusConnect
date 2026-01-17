import React from 'react'
import SmallBox from '../component/SmallBox'
function Others() {
  return (
    <div className='mt-5 mb-8 flex flex-wrap justify-center gap-4'>
   <SmallBox bg='bg-blue-500' text='View Notes'/>
   <SmallBox bg='bg-orange-400' text='Bookmarked'/>
   <SmallBox bg='bg-green-400' text='Job Applications '/>
    </div>
  )
}

export default Others
