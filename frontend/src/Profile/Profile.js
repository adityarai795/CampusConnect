import React from 'react'
// import ImageSection from './ImageSection'
// import PersonalDetail from './PersonalDetail'
// import AcademicDetails from './AcademicDetails'
// import Bio from './Bio'
// import Others from './Others'
import SmallBox from '../component/SmallBox'

function Profile() {
  return (
    // < div className=' bg-blue-50 pt-10 px-6'>
    //   <ImageSection />
    //   <PersonalDetail />
    //   <AcademicDetails />
    //   <Bio />
    //   <Others />
    // </div>

    <div className='bg-blue-50 pt-10 px-6'>
      {/* This is image section */}
      <div className='bg-blue-400 w-full h-60 flex items-end justify-center rounded-lg '>
       <div className='bg-black rounded-full w-40 h-40 border-4 border-white mb-4'>
       </div>
      </div>

      {/* This is make a personal detail section */}
      <form>
       
    <div className='bg-white  w-full mt-10 p-5 items-end justify-center rounded-lg  shadow-lg'>
       <p className='font-bold pb-3'>Basic info</p>
      <div className='md:flex md:flex-wrap py-2'>
      <label className='text-gray-500'>Name</label>
      <input type="text" className='border text-black font-bold bg-gray-300 rounded-md p-2 w-full mt-2' placeholder='Aditya Rai' />
      </div>

      <div className='md:flex md:flex-wrap py-2'>
      <label className='text-gray-500'>Email</label>
      <input type="text" className='border text-black font-bold bg-gray-300 rounded-md p-2 w-full mt-2' placeholder='adityarai@gmail.com' />
      </div>

      <div className='md:flex md:flex-wrap py-2 '>
      <label className='text-gray-500'>Phone</label>
      <input type="text" className='border text-black font-bold bg-gray-300 rounded-md p-2 w-full mt-2' placeholder='123654789' />
      </div>
    </div>

    <div className='bg-white  w-full mt-10 p-5 items-end justify-center rounded-lg  shadow-lg'>
       <p className='font-bold pb-3'>AcademicDetails</p>
      <div className='md:flex md:flex-wrap py-2'>
      <label className='text-gray-500'>University</label>
      <select className='border text-black font-bold bg-gray-300 rounded-md p-2 w-full mt-2'>
        <option value=''>Select your university</option>
        <option value='university1'>University 1</option>
        <option value='university2'>University 2</option>
        <option value='university3'>University 3</option>
      </select>
      </div>

      <div className='md:flex md:flex-wrap py-2'>
      <label className='text-gray-500'>Branch</label>
      <select className='border text-black font-bold bg-gray-300 rounded-md p-2 w-full mt-2'>
        <option value=''>Select your branch</option>
        <option value='branch1'>Branch 1</option>
        <option value='branch2'>Branch 2</option>
        <option value='branch3'>Branch 3</option>
      </select>
      </div>

      <div className='md:flex md:flex-wrap py-2 '>
      <label className='text-gray-500'>Semester</label>
      <select className='border text-black font-bold bg-gray-300 rounded-md p-2 w-full mt-2'>
        <option value=''>Select your semester</option>
        <option value='semester1'>Semester 1</option>
        <option value='semester2'>Semester 2</option>
        <option value='semester3'>Semester 3</option>
      </select>
      </div>
    </div>

    <div className='bg-white  w-full mt-10 p-5 items-end justify-center rounded-lg  shadow-lg'>     
       <p className='font-bold pb-3'>About</p>
      <div className='md:flex md:flex-wrap py-2 '>
      <label className='text-gray-500'>Bio</label>
      <textarea className='border text-black font-bold bg-gray-300 rounded-md p-2 w-full mt-2' placeholder='Tell us about yourself'></textarea>
      </div>

      <div className='md:flex md:flex-wrap py-2 '>
      <label className='text-gray-500'>LinkedIn / Portfolio</label>
     <input type="text" className='border text-black font-bold bg-gray-300 rounded-md p-2 w-full mt-2' placeholder='https://linkedin.com/in/aman-sharma' />
      </div>
    </div>
    <div className='md:flex block md:justify-between md:mb-[100px] mb-[75px] text-center'>
      
      <button type='submit' className='bg-blue-500 sm:w-[200px] text-white px-4 py-2 rounded-md mt-5'>Edit Profile</button>
      <br/>
      <button type='reset' className='bg-red-500 text-white sm:w-[200px] px-4 py-2 rounded-md mt-5'>Delete Account</button>
    </div>
      </form>


     <div className='mt-5 mb-8 flex flex-wrap justify-center gap-4'>
          <SmallBox bg='bg-blue-500' text='View Notes'/>
          <SmallBox bg='bg-orange-400' text='Bookmarked'/>
          <SmallBox bg='bg-green-400' text='Job Applications '/>
    </div>
    </div>

  )
}

export default Profile
