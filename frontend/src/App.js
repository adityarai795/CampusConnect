import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home.js";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";
import Login from "./pages/authPage/Login.js";
import Notes from "./pages/Notes/Notes.js";
import Result from "./pages/Result/Result.js";
import JobSection from "./pages/Job/JobSection.js";
import Community from "./pages/Community/community.js";
import Mypost from "./pages/Community/myPost.js";
import OpenPost from "./pages/Community/OpenPost.js";
import CreatPost from "./pages/Community/CreatePost.js";
import Profile from "./pages/Profile/Profile.js";
import Roadmap from "./pages/Practice/roadmapPage.js";
import RoadmapDetail from "./pages/Practice/openRoadMap.js";
import ShowCoding from "./pages/Practice/showcoding.js";
import ResumeBuilder from "./pages/resumeBuilder/resumeBuilder.js";
import PageNotFound from "./component/PageNotFound.js";
import About from "./pages/DetailsPageCC/about.js";
import FAQ from "./pages/DetailsPageCC/faq.js";
import Support from "./pages/DetailsPageCC/support.js";
import Contact  from "./pages/DetailsPageCC/contact.js";
import MarketPlace from "./pages/MarketPlace/marketPlace.js";
import ItemUploadForm from "./pages/MarketPlace/ItemUploadForm.js";
import MarketPlaceViewItem from "./pages/MarketPlace/ViewItem.js";
import AmbassadorsPage from "./pages/Ambassadors/AmbassadorsPage.js";
import MyNotes from "./pages/Profile/MyNotes.js";
import MyJobs from "./pages/Profile/MyJobs.js";
// import JobApplay from "./pages/Job/JobApplay.js";
import LearnTopic from "./pages/LearnTopic/learning.js";
import { AppProvider } from "./context";

function App() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/roadmap/:id" element={<RoadmapDetail />} />
            <Route path="/showcoding" element={<ShowCoding />} />
            <Route path="/result" element={<Result />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/jobs" element={<JobSection />} />
            {/* <Route path="/jobs/applyJob/:id" element={<JobApplay />} /> */}
            <Route path="/community" element={<Community />} />
            <Route path="/community/myposts" element={<Mypost />} />
            <Route path="/community/openPost/:id" element={<OpenPost />} />
            <Route path="/createPost" element={<CreatPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route
              path="/marketplace/uploadItem"
              element={<ItemUploadForm />}
            />
            <Route
              path="/marketplace/viewItem/:id"
              element={<MarketPlaceViewItem />}
            />
            <Route path="/ambassadors" element={<AmbassadorsPage />} />
            <Route path="/cc/support" element={<Support />} />
            <Route path="/cc/about" element={<About />} />
            <Route path="/cc/contact" element={<Contact />} />
            <Route path="/profile/mynotes" element={<MyNotes />} />
            <Route path="/profile/myjobs" element={<MyJobs />} />
            <Route path="/cc/faq" element={<FAQ />} />
            <Route path="/learntopic/:id" element={<LearnTopic />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
