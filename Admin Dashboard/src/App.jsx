import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Home from "./pages/Home/Home";

// Resource Pages
import ResourceTableManagement from "./pages/Notes/ResourceTableManagement";
import UploadResource from "./pages/Notes/UploadResource";

// Job Pages
import JobManagement from "./pages/Jobs/JobManagement";
import CreateJob from "./pages/Jobs/CreateJob";

// Result Pages
import ResultManagement from "./pages/Result/ResultManagement";
import CreateResult from "./pages/Result/CreateResult";

// Community Pages
import CommunityManagement from "./pages/Community/CommunityManagement";

// Coding Problem Pages
import ProblemManagement from "./pages/coding/ProblemManagement";
import AddProblem from "./pages/coding/AddProblem";

// Practice Pages
import PracticeManagement from "./pages/Practice/PracticeManagement";

// Roadmap Pages
import RoadmapManagement from "./pages/Roadmap/RoadmapManagement";

// Marketplace Pages
import MarketplaceManagement from "./pages/Marketplace/MarketplaceManagement";

// Auth Pages
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgetPassword from "./pages/Auth/ForgetPassword";

// Other Pages
import PageNotFound from "./component/PageNotFound";

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

          {/* Resources/Notes */}
          <Route path="/notes" element={<ResourceTableManagement />} />
          <Route path="/uploadnotes" element={<UploadResource />} />
          <Route path="/showallNotes" element={<ResourceTableManagement />} />

          {/* Jobs */}
          <Route path="/jobs" element={<JobManagement />} />
          <Route path="/viewalljobs" element={<JobManagement />} />
          <Route path="/createJob" element={<CreateJob />} />

          {/* Results */}
          <Route path="/result" element={<ResultManagement />} />
          <Route path="/createResult" element={<CreateResult />} />
          <Route path="/showallResult" element={<ResultManagement />} />

          {/* Community */}
          <Route path="/community" element={<CommunityManagement />} />
          <Route path="/showallPost" element={<CommunityManagement />} />

          {/* Coding Problems */}
          <Route path="/showallProblems" element={<ProblemManagement />} />
          <Route path="/addProblems" element={<ProblemManagement />} />

          {/* Practice */}
          <Route path="/practice" element={<PracticeManagement />} />

          {/* Roadmaps */}
          <Route path="/roadmaps" element={<RoadmapManagement />} />

          {/* Marketplace */}
          <Route path="/marketplace" element={<MarketplaceManagement />} />

          {/* College Management */}

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
