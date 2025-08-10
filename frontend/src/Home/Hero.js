import React from 'react'
import Card from '../component/Card'
import { Link } from 'react-router-dom';
import TrendingSkills from '../component/TrendingSkills';
import QuotesSlider from "../component/QuotesSlider";
import { FaUniversity, FaFileAlt, FaUserGraduate, FaLaptopCode, FaBrain, FaBook } from 'react-icons/fa';
import HomeImage from '../assets/herosection.png'
function Hero() {
  return (
    <div className="bg-gray-100 ">
      {/* medium size screens */}
      <div className="hidden md:block w-full bg-blue-100  rounded-lg shadow-lg pt-[100px] pb-[100px]">
        <div className='flex'>
          <div className="w-1/2  p-5 mt-[80px]">
            <h1 className="text-5xl font-bold px-4 ">
              One Stop Solution for{" "}
              <span className="text-blue-400">Students</span>{" "}
            </h1>
            <p className="mt-2 pt-3 text-gray-500 px-4">
              Connect, Learn, and Grow with CampusConnect – India's Ultimate
              Campus Platform.
            </p>
            <div className="flex flex-wrap">
              <Link className="cursor-pointer" to={"/result"}>
                {" "}
                <div className="border-2 bg-blue-500 px-4 py-4 mx-3 mb-2 mt-5 rounded-full text-white font-bold">
                  Explore University Results
                </div>
              </Link>
              <Link className="cursor-pointer" to={"/community"}>
                {" "}
                <div className=" bg-white px-5 py-4 mx-3 mb-2 mt-5 rounded-full text-blue-400 border-2 border-blue-300 font-bold">
                  Join Community
                </div>
              </Link>
              <Link className="cursor-pointer" to={"/jobs"}>
                {" "}
                <div className="border-2  bg-black px-4 py-4 mx-3 mb-2 mt-5 rounded-full text-white  font-bold">
                  Browse Jobs
                </div>
              </Link>
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <img
              src={HomeImage}
              alt="Home"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
      {/* for small size screens */}
      <div className="md:hidden w-full bg-blue-100 p-4 pb-[100px] rounded-lg shadow-lg text-center mt-[80px]">
        <h1 className="text-3xl font-bold px-2 mt-6">
          One Stop Solution for Students
        </h1>
        <p className="mt-2 px-3">
          Connect, Learn, and Grow with CampusConnect – India's Ultimate Campus
          Platform.
        </p>

        <Link className="cursor-pointer" to={"/result"}>
          {" "}
          <div className="border-2 bg-blue-400 py-3 mb-2 mt-5 rounded-xl text-white font-bold">
            Explore University Results
          </div>
        </Link>
        <Link className="cursor-pointer" to={"/community"}>
          {" "}
          <div className="border-2 bg-white py-3 my-2 rounded-xl text-blue-400 font-bold">
            Join Community
          </div>
        </Link>
        <Link className="cursor-pointer" to={"/jobs"}>
          {" "}
          <div className="border-2 bg-blue-200 py-3 my-2 rounded-xl text-blue-400 font-bold">
            Browse Jobs
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero
