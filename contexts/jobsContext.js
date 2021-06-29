import React from "react";
import { useState } from "react";

const JobsContext = React.createContext();

function JobsContextProvider(props) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    job_type: [],
    department: [],
    work_schedule: [],
    experience: [],
  });
  const [sorts, setSorts] = useState({});

  return (
    // dont forget to put values here
    <JobsContext.Provider
      value={{
        search,
        setSearch,
        selectedFilters,
        setSelectedFilters,
        sorts,
        setSorts,
      }}
    >
      {props.children}
    </JobsContext.Provider>
  );
}

export { JobsContextProvider, JobsContext };
