import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Home/Home.js';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile/Profile.js';
import Result from './Result/Result.js';
import Notes from './Notes/Notes.js';
import JobSection from './Job/JobSection.js';
import Community from './Community/community.js';
import ForgetPassword from './ForgetPassword.js';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/jobs" element={<JobSection />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
