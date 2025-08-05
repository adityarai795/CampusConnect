import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Logo from "../assets/logo.png";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  console.log("this is user",user)
  return (
    <>
      <div className="w-full flex justify-between items-center bg-white px-6 py-3 shadow-md border-b border-gray-200 fixed top-1 z-50">
        <div className="flex items-center">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="h-10 w-10 rounded-full " />
          </Link>
          <Link to={"/"}>
            <h1 className="text-2xl font-bold text-blue-600 px-3 hidden md:block">
              CampusConnect
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center ">
          <ul className="flex space-x-4 ">
            <Link
              to={"/"}
              className="hover:text-blue-400 cursor-pointer transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to={"/notes"}
              className="hover:text-blue-400 cursor-pointer transition-all duration-200"
            >
              Notes
            </Link>
            <Link
              to={"/result"}
              className="hover:text-blue-400 cursor-pointer transition-all duration-200"
            >
              Results
            </Link>
            <Link
              to={"/community"}
              className="hover:text-blue-400 cursor-pointer transition-all duration-200"
            >
              Community
            </Link>
            <Link
              to={"/jobs"}
              className="hover:text-blue-400 cursor-pointer transition-all duration-200"
            >
              Jobs
            </Link>

            {/* <Link
              to={"/login"}
              className=" bg-blue-400 px-[5px] py-[3px] rounded-md text-white cursor-pointer transition-all duration-2000110 "
            >
              Login
            </Link>
             */}
            {user ? (
              <>
                <button
                  onClick={logout}
                  className="bg-red-400 px-2 py-1 rounded-md text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className="bg-blue-400 px-[5px] py-[3px] rounded-md text-white"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
        <div className="text-3xl font-bold md:hidden">
          <h1 onClick={() => setIsOpen(!isOpen)}>&#8801;</h1>
        </div>
      </div>

      {/* Responsive Navbar that show in onClick in the  mobile view*/}
      {isOpen && (
        <div className="md:hidden mt-[80px]">
          <ul className="flex flex-col space-y-2 px-4 mb-4">
            <Link
              to={"/"}
              className="hover:text-white  hover:bg-blue-400 px-[5px] py-[3px] rounded-md cursor-pointer transition-all duration-200  w-full "
            >
              Home
            </Link>
            <Link
              to={"/notes"}
              className="hover:text-white hover:bg-blue-400 px-[5px] py-[3px] rounded-md  cursor-pointer transition-all duration-200 w-full m-1"
            >
              Notes
            </Link>
            <Link
              to={"/result"}
              className="hover:text-white hover:bg-blue-400 px-[5px] py-[3px] rounded-md cursor-pointer transition-all duration-200 w-full m-1"
            >
              Results
            </Link>
            <Link
              to={"/community"}
              className="hover:text-white hover:bg-blue-400 px-[5px] py-[3px] rounded-md cursor-pointer transition-all duration-200 w-full m-1"
            >
              Community
            </Link>
            <Link
              to={"/jobs"}
              className="hover:text-white hover:bg-blue-400 px-[5px] py-[3px] rounded-md cursor-pointer transition-all duration-200 w-full m-1"
            >
              Jobs
            </Link>
            {user ? (
              <>
                <span className="px-2">Hi, {user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="bg-red-400 px-2 py-1 rounded-md text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className="bg-blue-400 px-2 py-1 rounded-md text-white"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
