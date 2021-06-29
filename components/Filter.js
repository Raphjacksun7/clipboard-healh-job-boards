import { React, useContext, useState } from "react";
import { JobsContext } from "../contexts/jobsContext";

export default function Filter(props) {
  const { filterId, doc_count, title } = props;

  const [selected, setSelected] = useState(false);
  const { setSelectedFilters } = useContext(JobsContext);

  function updateSelectedFilters(filterId) {
    if (!selected) {
      setSelectedFilters((prevSelectedFilters) => {
        return {
          ...prevSelectedFilters,
          [title]: [...prevSelectedFilters[title], filterId],
        };
      });
    } else {
      setSelectedFilters((prevSelectedFilters) => {
        return {
          ...prevSelectedFilters,
          [title]: prevSelectedFilters[title].filter(
            (item) => item !== filterId
          ),
        };
      });
    }
  }

  function toggleSelected() {
    setSelected((prevSelected) => (prevSelected ? false : true));
  }

  return (
    <div
      onClick={() => {
        updateSelectedFilters(filterId);
        toggleSelected();
      }}
      className={`${
        selected
          ? "bg-blue-100 border rounded-md border-blue-500"
          : "border  border-transparent"
      } text-sm flex-wrap truncate tracking-normal my-2 p-1 rounded-md`}
    >
      <div className="inline-block">{filterId}</div>
      <div
        className={`${
          selected ? "text-black" : "text-gray-300"
        } ml-3 inline-block`}
      >
        {doc_count}
      </div>
      {selected ? (
        <i aria-hidden className="fas fa-check-square inline-block mx-4"></i>
      ) : null}
    </div>
  );
}
