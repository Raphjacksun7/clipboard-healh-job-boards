import React from "react";

export default function JobCard(props) {
  const [showExtendedInfo, setExtendedInfo] = React.useState(false);
  const onClick = () => setExtendedInfo(!showExtendedInfo);
  const {
    job_title: jobTitle,
    created,
    city,
    salary_range: salaryRange,
    job_type: jobType,
    department: departments,
    hours,
    work_schedule: workSchedule,
    description: summary,
  } = props;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const basicInfo = () => {
    return `${jobType} | ${formatter.format(
      salaryRange[0]
    )} - ${formatter.format(salaryRange[1])} an hour | ${city}`;
  };

  const jobExtended = (
    <div className="flex flex-wrap text-sm">
      <div className="flex flex-wrap lg:w-5/6">
        <div className="flex flex-wrap m-2">
          <div className="font-bold md:w-1/2 align-top">Department:</div>
          <div className="  md:w-1/2">{departments.join(", ")}</div>
        </div>
        <div className="md:w-full flex flex-wrap m-2">
          <div className="w-full font-bold md:w-1/2 align-top">
            Hours / shifts:
          </div>
          <div className="w-full md:w-1/2">{`${hours} hours / ${workSchedule}`}</div>
        </div>
        <div className="flex flex-wrap m-2">
          <div className=" font-bold md:w-1/2 align-top">Summary</div>
          <div className=" md:w-1/2">{summary}</div>
        </div>
      </div>
      <div className="flex md:flex-wrap lg:flex-col lg:w-1/6 justify-center items-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg m-2">
          Job Details
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg m-2">
          Save Job
        </button>
      </div>
    </div>
  );

  function weeksSince(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    return Math.floor((today - date) / (1000 * 60 * 60 * 24 * 7));
  }

  return (
    <div className="my-3 p-2 border-t-2">
      <div
        onClick={onClick}
        className="flex flex-wrap flex-row justify-between items-center"
      >
        <div className="">
          <p className="block font-bold">{jobTitle}</p>
          <p className="block text-sm">{basicInfo()}</p>
        </div>
        <div className="">
          <p>{`${weeksSince(created)} weeks ago`}</p>
        </div>
      </div>
      {showExtendedInfo ? <>{jobExtended}</> : null}
    </div>
  );
}
