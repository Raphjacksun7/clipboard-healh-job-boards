import { React } from "react";

import Filter from "./Filter";

export default function FilterCard(props) {
  const titleTransformer = {
    job_type: "Job type",
    department: "Department",
    work_schedule: "Work Schedule",
    experience: "Experience",
  };

  const { title, filters } = props;

  const filterElements = filters.map((filter) => {
    const { key, doc_count } = filter;
    return (
      <Filter title={title} key={key} filterId={key} doc_count={doc_count} />
    );
  });

  return (
    <div className="max-w-sm bg-white border-1 border-gray-300 p-4 rounded-sm tracking-wide mb-3 w-full md:max-h-80 md:overflow-auto">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-md leading-6 font-medium text-black uppercase truncate">
          {titleTransformer[title]}
        </h3>
      </header>
      {filterElements}
    </div>
  );
}
