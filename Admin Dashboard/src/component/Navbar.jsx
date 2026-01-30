import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/authAction";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const authState = useSelector((state) => state.auth);
  console.log("this is auth for navbar :", authState);
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full flex justify-between items-center bg-white px-6 py-3 shadow-md border-b border-gray-200 fixed top-1 z-50">
        <div className="flex items-center">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="h-10 w-10 rounded-full " />
          </Link>
          <Link to={"/"}>
            {" "}
            <h1 className="text-2xl font-bold text-blue-600 px-3 hidden md:block">
              CampusConnect
            </h1>
          </Link>
        </div>
        <div className="flex items-center justify-center ">
          <ul className="flex space-x-4">
            {authState.isLoggedIn ? (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
