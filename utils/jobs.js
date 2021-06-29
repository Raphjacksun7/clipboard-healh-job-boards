const labeltoProperty = {
    Role: "job_title",
    Experience: "experience",
    Location: "state",
    Education: "required_credentials",
    Department: "department",
  };
  
  function dynamicSort(property, order) {
    let sortOrder = 1;
    if (order === "desc") sortOrder = -1;
  
    if (["job_title", "experience", "state"].includes(property)) {
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        const valA = a[property].toUpperCase();
        const valB = b[property].toUpperCase();
        const result = valA < valB ? -1 : valA > valB ? 1 : 0;
        return result * sortOrder;
      };
    } else {
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        const valA = a[property].length;
        const valB = b[property].length;
        const result = valA < valB ? -1 : valA > valB ? 1 : 0;
        return result * sortOrder;
      };
    }
  }
  
  module.exports.sortJobs = function sortJobs(jobsToSort, ordering) {
    const [...jobs] = jobsToSort;
    const { order, type } = ordering;
    if (type === "Location") {
      jobs.sort(dynamicSort(labeltoProperty[type], order));
    } else {
      jobs.forEach((hospital) => {
        hospital.items.sort(dynamicSort(labeltoProperty[type], order));
      });
    }
    return jobs;
  };
  
  module.exports.sumJobsInSearch = function sumJobsInSearch(jobs) {
    let sum = 0;
    jobs.forEach((hospital) => (sum = sum + hospital.items.length));
    return sum;
  };
  