import React from "react";
import JobCard from "./JobCard";

export default function HospitalCard(props) {
  const { name, total_jobs_in_hospital: totalJobs, items: jobs } = props;
  const jobCards = jobs.map((job, index) => {
    return <JobCard key={job.job_id} {...job} />;
  });

  const [showJobs, setShowJobs] = React.useState(false);
  const onClick = () => setShowJobs(!showJobs);

  return (
    <div className="w-full bg-white border-1 border-gray-200 p-4 tracking-wide">
      <div onClick={onClick} className="flex items-center cursor-pointer">
        <div className="w-10 mr-3 bg-gray-400 rounded-md text-white p-2 uppercase text-center">
          <p>{name.slice(0, 2)}</p>
        </div>
        <div className="text-sm">
          <p>{`${totalJobs} jobs for ${name}`}</p>
        </div>
      </div>
      {showJobs ? <div className="block">{jobCards}</div> : null}
    </div>
  );
}
