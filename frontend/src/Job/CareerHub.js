import React, { useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";
import JobCardSection from "./JobCardSection";
import { internships, jobs } from "./dummyData"; // your static or fetched data

const CareerHub = () => {
  const [filteredInternships, setFilteredInternships] = useState(internships);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const filterData = (filters) => {
    const applyFilter = (data) =>
      data.filter((item) => {
        const matchSearch =
          item.position.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.company.toLowerCase().includes(filters.search.toLowerCase());

        const matchType = filters.jobType
          ? item.type === filters.jobType
          : true;

        const matchDept = filters.department
          ? item.department === filters.department
          : true;

        const matchLocation = filters.location
          ? item.location === filters.location
          : true;

        return matchSearch && matchType && matchDept && matchLocation;
      });

    setFilteredInternships(applyFilter(internships));
    setFilteredJobs(applyFilter(jobs));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <SearchFilter onFilter={filterData} />
      <JobCardSection title="🔥 Internships" jobs={filteredInternships} />
      <JobCardSection title="💼 Jobs" jobs={filteredJobs} />
    </div>
  );
};

export default CareerHub;
