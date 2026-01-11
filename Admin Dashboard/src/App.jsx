import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Home from "./pages/Home/Home";
import Notes from "./pages/Notes/notes";
import UploadResource from "./pages/Notes/UploadResource";
import ResourceTable from "./pages/Notes/ResourceTable";
import Result from "./pages/Result/result";
import Community from "./pages/Community/community";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Jobs from "./pages/Jobs/JobView";
import JobView from "./pages/Jobs/JobView";
import CreateJob from "./pages/Jobs/CreateJob";
import CreateResult from "./pages/Result/CreateResult";
import ShowallResult from "./pages/Result/ShowallResult";
import ShowallPost from "./pages/Community/ShowallPost";
import ShowAllProblem from "./pages/coding/showallProblems";
import AddProblem from "./pages/coding/AddProblem";
import PageNotFound from "./component/PageNotFound";

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
          <Route path="/uploadnotes" element={<UploadResource />} />
          <Route path="/showallNotes" element={<ResourceTable />} />
          <Route path="/result" element={<Result />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/viewalljobs" element={<JobView />} />
          <Route path="/createJob" element={<CreateJob />} />
          <Route path="/createResult" element={<CreateResult />} />
          <Route path="/showallResult" element={<ShowallResult />} />
          <Route path="/showallPost" element={<ShowallPost />} />
          <Route path="/showallProblems" element={<ShowAllProblem />} />
          <Route path="/addProblems" element={<AddProblem />} />
          <Route path="*" element={<PageNotFound />} />
          {/* future route example */}
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
