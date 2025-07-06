import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import Footer from './component/footer.jsx';
import Home from './Home/Home.jsx';
import Sidebar from './component/Sidebar.jsx';
import Result from '../src/Result/result.jsx';
import Notes from '../src/Notes/notes.jsx';
import Community from './Community/Community.jsx';
import PageNotFound from './component/PageNotFound.jsx'
import Login from './Auth/Login.jsx';
import SignUp from './Auth/Signup.jsx';
import ForgetPassword from './Auth/ForgetPassword.jsx';
const App = () => (
  <Router>
    <Navbar />
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/result" element={<Result />} />
          <Route path="/community" element={<Community />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forget' element={<ForgetPassword/> }/>
          <Route path="*" element={<PageNotFound />} />
          {/* future route example */}
          {/* <Route path="/jobs" element={<Jobs />} /> */}
        </Routes>
      </main>
    </div>
  </Router>
);

export default App
