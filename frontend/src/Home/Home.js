import React from 'react'
import Card from "../component/Card";
import TrendingSkills from "../component/TrendingSkills";
import { Link } from "react-router-dom";
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
        <Link to={"/resumeBuilder"}>
          <Card title="Resume Builder" image={<FaUserGraduate size={40} />} />
        </Link>
        <Link to={"/showCoding"}>
          <Card title="Quiz/Coding" image={<FaBrain size={40} />} />
        </Link>
        <Link to={"/result"}>
          <Card title="University Result" image={<FaUniversity size={40} />} />
        </Link>
        <Link to={"/notes"}>
          <Card
            title="Notes & Question Papers"
            image={<FaFileAlt size={40} />}
          />
        </Link>
        <Link to={"/jobs"}>
          <Card title="Internships & Jobs" image={<FaLaptopCode size={40} />} />
        </Link>
        <Link to={"/notes"}>
          <Card title="Resources" image={<FaBook size={40} />} />
        </Link>
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

export default Home
