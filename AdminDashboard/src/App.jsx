import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Home from "./pages/Home/Home";

// Resource Pages
import ResourceTableManagement from "./pages/Notes/ResourceTableManagement";

// Job Pages
import JobManagement from "./pages/Jobs/JobManagement";

// Result Pages
import ResultManagement from "./pages/Result/ResultManagement";

// Community Pages
import CommunityManagement from "./pages/Community/CommunityManagement";

// Coding Problem Pages
import ProblemManagement from "./pages/coding/ProblemManagement";

// Practice Pages

// Roadmap Pages
import RoadmapManagement from "./pages/Roadmap/RoadmapManagement";

// Marketplace Pages
import MarketplaceManagement from "./pages/Marketplace/MarketplaceManagement";

// Auth Pages
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgetPassword from "./pages/Auth/ForgetPassword";

import ManageQuiz from "./pages/Quize/manageQuize";
// User Management
import UserManagement from "./pages/Users/UserManagement";
import Ambasdor from "./pages/Users/Ambasdor";
import ManageProjects from "./pages/Projects/manageProjects";
// Other Pages
import PageNotFound from "./component/PageNotFound";
import ManageInterview from "./pages/Interview/manageInterview";
import Contactqueries from "./pages/Contact/contactqueries";

const App = () => (
  <Router>
    {/* <Navbar /> */}
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 w-full">
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Home />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget" element={<ForgetPassword />} />

          {/* Users & Staff */}
          <Route path="/users" element={<UserManagement />} />  
          <Route path="/ambassadors" element={<Ambasdor />} />

          {/* Resources/Notes */}
          <Route path="/showallNotes" element={<ResourceTableManagement />} />

          {/* Jobs */}
          <Route path="/jobs" element={<JobManagement />} />

          {/* Results */}
          <Route path="/result" element={<ResultManagement />} />
          <Route path="/showallResult" element={<ResultManagement />} />

          {/* Community */}
          <Route path="/community" element={<CommunityManagement />} />

          {/* Coding Problems */}
          <Route path="/showallProblems" element={<ProblemManagement />} />
          <Route path="/addProblems" element={<ProblemManagement />} />

          {/* Practice */}
          <Route path="/quizquestions" element={<ManageQuiz />} />

          {/* Roadmaps */}
          <Route path="/roadmaps" element={<RoadmapManagement />} />

          {/* Marketplace */}
          <Route path="/marketplace" element={<MarketplaceManagement />} />

          {/* College Management */}
          <Route path="/projects" element={<ManageProjects />} />
          <Route path="/interviewquestions" element={<ManageInterview />} />
            <Route path="/contactqueries" element={<Contactqueries />} />
          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
