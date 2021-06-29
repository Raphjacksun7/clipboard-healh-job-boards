import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-white mx-auto mt-8 px-2">
      <div className="sm:flex sm:mt-8">
        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between pb-4">
          <div className="flex flex-col md:w-1/2 pr-8">
            <span className="font-bold text-gray-700 uppercase mb-2">
              About us
            </span>
            <span className="my-1">
              We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.
            </span>
            <span className="my-1">
              All copyrights reserved &copy; 2020 - Health Explore.
            </span>
          </div>
          <div className="flex flex-col md:w-1/4">
            <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
              Sitemap
            </span>
            <span className="my-1">Nurses</span>
            <span className="my-1">Employers</span>
            <span className="my-1">Social Networking</span>
            <span className="my-1">Jobs</span>
          </div>
          <div className="flex flex-col md:w-1/4">
            <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
              Privacy
            </span>
            <span className="my-1">Terms of Use</span>
            <span className="my-1">Privacy Policy</span>
            <span className="my-1">Cookie Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
