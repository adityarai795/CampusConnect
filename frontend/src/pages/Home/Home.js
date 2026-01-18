import React from "react";
import Card from "../../component/Card";
import TrendingSkills from "../../component/TrendingSkills";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import QuotesSlider from "../../component/QuotesSlider";
import {
  FaUniversity,
  FaFileAlt,
  FaUserGraduate,
  FaLaptopCode,
  FaBrain,
  FaBook,
} from "react-icons/fa";
import Hero from "./Hero";
import VerificationpopUp from "../../component/VerificationpopUp";
import {
  ShoppingBag,
  FileText,
  Code,
  GraduationCap,
  BookOpen,
  Briefcase,
  Map,
  Users,
} from "lucide-react";
import { getHomePageData } from "../../api/home.js";
function Home() {
  const [open, setOpen] = useState(true);

const features = [
  {
    title: "MarketPlace",
    icon: <ShoppingBag className="w-6 h-6" />,
    link: "/marketplace",
  },
  {
    title: "Resume Builder",
    icon: <FileText className="w-6 h-6" />,
    link: "/resume",
  },
  {
    title: "Quiz/Coding",
    icon: <Code className="w-6 h-6" />,
    link: "/showcoding",
  },
  {
    title: "University Result",
    icon: <GraduationCap className="w-6 h-6" />,
    link: "/result",
  },
  {
    title: "Notes & Question Papers",
    icon: <BookOpen className="w-6 h-6" />,
    link: "/notes",
  },
  {
    title: "Internships & Jobs",
    icon: <Briefcase className="w-6 h-6" />,
    link: "/jobs",
  },
  {
    title: "Roadmap",
    icon: <Map className="w-6 h-6" />,
    link: "/roadmap",
  },
  {
    title: "Ambassadors",
    icon: <Users className="w-6 h-6" />,
    link: "/ambassadors",
  },
  ];
  

  return (
    <>
      {/* <VerificationpopUp show={open} onClose={() => setOpen(false)} /> */}
      <Hero />  
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Services
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need for your academic and career success
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center">
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              icon={feature.icon}
              link={feature.link}
            />
          ))}
        </div>
      </div>
      <div>
        {/* // this is div for trending skils */}
        <TrendingSkills />

        {/* // write a beautiful quotes */}
        <QuotesSlider />
      </div>
    </>
  );
}

export default Home;
