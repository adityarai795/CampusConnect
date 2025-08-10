import React from 'react';
import Sidebar from '../component/Sidebar';
import { useSelector } from 'react-redux';
function Home() {
  const authState = useSelector((state) => state.auth);
  return (
    <div className="grid grid-cols-12 min-h-screen mt-[70px]">
      {/* Sidebar - takes 3 out of 12 columns */}
      {/* <div className=" col-span-2 bg-gray-100 h-screen">
        <Sidebar />
      </div> */}

      {/* Main Content - takes 9 out of 12 columns */}
      <div className="col-span-9 p-6">
        <h2 className="text-2xl font-semibold">This is the Home Page</h2>
      </div>
    </div>
  );
}

export default Home;
