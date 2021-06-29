import jobs from "../../data/jobs";
import validateFilters from "../../utils/filters";

export default async (req, res) => {
  const { search: search64 } = req.query;
  const searchStr = Buffer.from(search64, "base64").toString();
  const searchObj = JSON.parse(searchStr);
  const { search, selectedFilters } = searchObj;
  if (search !== undefined && selectedFilters !== undefined) {
    let finalJobs = [];
    if (validateFilters(selectedFilters)) {
      jobs.forEach((hospital) => {
        const filteredJobs = hospital.items
          .filter((job) => {
            let jobInfilters = true;
            for (let filter in selectedFilters) {
              if (
                ["job_type", "work_schedule", "experience"].includes(filter)
              ) {
                if (
                  selectedFilters[filter].length > 0 &&
                  !selectedFilters[filter].includes(job[filter])
                ) {
                  jobInfilters = false;
                }
              } else if (["department"].includes(filter)) {
                if (
                  selectedFilters[filter].length > 0 &&
                  !selectedFilters[filter].some((requiredFilter) => {
                    return job[filter].includes(requiredFilter);
                  })
                ) {
                  jobInfilters = false;
                }
              } else {
                throw new Error("There are unidentified filters required");
              }
            }
            return jobInfilters;
          })
          .filter((job) => {
            // return true if the text in json of the job
            // contains the searchStr
            // DISCLAIMER: this is a non-scalable
            // way to implement search. Here we should
            // use a search-friendly engine such as:
            // Elastic Search,
            // Solr
            // Algolia
            // our own search
            const jobAsStr = JSON.stringify(job).toLowerCase();
            return jobAsStr.includes(search.toLowerCase());
          });

        const jobCount = filteredJobs.length;

        if (jobCount > 0) {
          const hospitalWithFilteredJobs = {
            state: filteredJobs[0].state,
            total_jobs_in_hospital: jobCount,
            name: hospital.name,
            items: filteredJobs,
          };
          finalJobs.push(hospitalWithFilteredJobs);
        }
      });
      res.statusCode = 200;

      // this timeout emulates unstable network connection, do not remove this one
      // you need to figure out how to guarantee that client side will render
      // correct results even if server-side can't finish replies in the right order
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));
      res.json({ jobs: finalJobs });
    } else {
      res.statusCode = 406;

      // this timeout emulates unstable network connection, do not remove this one
      // you need to figure out how to guarantee that client side will render
      // correct results even if server-side can't finish replies in the right order
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));
      res.json({
        message: "Your search filters contain filters that do not exist",
      });
    }
  } else {
    res.statusCode = 406;

    // this timeout emulates unstable network connection, do not remove this one
    // you need to figure out how to guarantee that client side will render
    // correct results even if server-side can't finish replies in the right order
    await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));
    res.json({
      message:
        "Your search object is not acceptable or does not have required fields",
    });
  }
};
