import { React, useState } from "react";
import SortingDropdown from "./sortingDropdown";

export default function SortBar() {
  const options = ["Location", "Role", "Department", "Education", "Experience"];

  const sortByOptions = options.map((option) => {
    return <SortingDropdown key={option} buttonText={option} />;
  });

  const totalJobs = 7753;
  return (
    <div className="w-full flex md:flex-wrap bg-white">
      <div className="xl:w-1/6 inline-block justify-start lg:w-1/3 py-6 px-4">
        <div className="inline-block font-bold mr-2">{`${totalJobs}`}</div>
        <div className="inline-block text-sm">job postings</div>
      </div>
      <div className="xl:w-5/6 md:w-full hidden justify-end md:flex lg:w-2/3">
        {/* <div className="xl:w-2/12 text-gray-300 py-8 text-sm px-4 w-full">
          Sort by
        </div> */}
        <div className=" flex flex-wrap w-full">
          <div className="flex items-center justify-center px-2 py-2 text-gray-300 text-sm">
            Sort By
          </div>
          {sortByOptions}
        </div>
      </div>
    </div>
  );
}
