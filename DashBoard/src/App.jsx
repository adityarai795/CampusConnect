import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Jobs from './Jobs/Jobs.jsx';
import CreateJob from './Jobs/CreateJob.jsx';
import JobView from './Jobs/JobView.jsx';
import ForgetPassword from './Auth/ForgetPassword.jsx';
import CreateResult from './Result/CreateResult.jsx';
import ShowallResult from './Result/ShowallResult.jsx';
import ResourceTable from './Notes/ResourceTable.jsx';
import UploadResource from './Notes/UploadResource.jsx';
import ShowallPost from './Community/ShowallPost.jsx';
import ShowAllProblem from './coding/showallProblems.jsx'
import AddProblem from './coding/AddProblem.jsx';
const App = () => (
  <Router>
    <Navbar />
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path='/uploadnotes' element={<UploadResource />} />
          <Route path='/showallNotes' element={<ResourceTable />} />
          <Route path="/result" element={<Result />} />
          <Route path="/community" element={<Community />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forget' element={<ForgetPassword />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path='/viewalljobs' element={<JobView/> } />
          <Route path="/createJob" element={<CreateJob />} />
          <Route path='/createResult' element={<CreateResult />} />
          <Route path='/showallResult' element={<ShowallResult />} />
          <Route path='/showallPost' element={<ShowallPost />} />
          <Route path="/showallProblems" element={<ShowAllProblem />} />
          <Route path="/addProblems" element={<AddProblem />} />
          <Route path="*" element={<PageNotFound />} />
          {/* future route example */}
        </Routes>
      </main>
    </div>
  </Router>
);

export default App
