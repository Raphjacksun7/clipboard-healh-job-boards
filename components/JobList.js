import { React, useEffect, useState, useContext } from "react";
import HospitalCard from "./HospitalCard";
import { JobsContext } from "../contexts/jobsContext";
import { sortJobs } from "../utils/jobs";
export default function JobList(props) {
  const [hospitalsWithJobs, setHospitalsWithJobs] = useState([]);
  const { search, selectedFilters, sorts } = useContext(JobsContext);
  const [loading, setLoading] = useState(false);

  const hospitalCards = hospitalsWithJobs.map((hospital, index) => {
    const { job_tytle, ...propsForHospitalCard } = hospital;
    return <HospitalCard key={index} {...propsForHospitalCard} />;
  });

  useEffect(() => {
    let canceled = false;
    const searchObj = {
      search: search,
      selectedFilters: selectedFilters,
      sorts: sorts,
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `/api/jobs?search=${base64SearchObj}`;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!canceled) {
          let jobsToRender = data.jobs;
          if (sorts.type && sorts.order) {
            jobsToRender = sortJobs(data.jobs, sorts);
          }
          setHospitalsWithJobs(jobsToRender);
          setLoading(false);
        }
      })
      .catch((err) => {
        return <>There was a problem bringing the jobs. Sorry :(</>;
      });
    return () => (canceled = true);
  }, [search, selectedFilters]);

  useEffect(() => {
    if (sorts.type && sorts.order) {
      const sortedJobs = sortJobs(hospitalsWithJobs, sorts);
      setHospitalsWithJobs(sortedJobs);
    }
  }, [sorts]);

  return (
    <div className="block w-full">
      {loading ? 
      <div className="text-center text-lg font-bold mt-6">
        Loading...
      </div> : 
      <>
        { hospitalCards.length ? hospitalCards : 
        <div className="text-center text-lg font-bold mt-6">
          No results found for this search
        </div>}
      </>}
    </div>
  );
}
