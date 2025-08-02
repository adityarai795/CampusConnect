import React from 'react'
import Card from "../component/Card";
import TrendingSkills from "../component/TrendingSkills";
import QuotesSlider from "../component/QuotesSlider";
import {
  FaUniversity,
  FaFileAlt,
  FaUserGraduate,
  FaLaptopCode,
  FaBrain,
  FaBook,
} from "react-icons/fa";
import Hero from './Hero'
function Home() {
  return (
    <>
      <Hero />
      <div className="w-full flex flex-wrap justify-center items-center mt-10 ">
        <Card title="Resume Builder" image={<FaUserGraduate size={40} />} />
        <Card title="Quiz/Coding" image={<FaBrain size={40} />} />
        <Card title="University Result" image={<FaUniversity size={40} />} />
        <Card title="Notes & Question Papers" image={<FaFileAlt size={40} />} />
        <Card title="Internships & Jobs" image={<FaLaptopCode size={40} />} />
        <Card title="Resources" image={<FaBook size={40} />} />
      </div>
      <div>
        <TrendingSkills />
        <QuotesSlider />
      </div>
    </>
  );
}

export default Home
