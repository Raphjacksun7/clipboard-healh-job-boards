const fetch = require("node-fetch");
const jobUtilities = require("../utils/jobs");

// general JOBS
describe("GET jobs endpoint", () => {
  it("should get all jobs from every hospital", async () => {
    const searchObj = {
      search: "",
      selectedFilters: {
        job_type: [],
        work_schedule: [],
        experience: [],
        department: [],
      },
      sorts: {},
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `http://localhost:3000/api/jobs?search=${base64SearchObj}`;
    const res = await fetch(url);
    expect(res.status).toEqual(200);
    expect(res.body).not.toBeNull();
    const data = await res.json();
    expect(data.jobs.length).toEqual(20);
  });
});
// jobs with search

describe("GET jobs - specific search:", () => {
  it("should get all jobs from every hospital that have 'blood'", async () => {
    const searchObj = {
      search: "blood",
      selectedFilters: {
        job_type: [],
        work_schedule: [],
        experience: [],
        department: [],
      },
      sorts: {},
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `http://localhost:3000/api/jobs?search=${base64SearchObj}`;
    const res = await fetch(url);
    expect(res.status).toEqual(200);
    expect(res.body).not.toBeNull();
    const data = await res.json();
    expect(data.jobs.length).toEqual(10);
  });

  it("should get all jobs from every hospital that have 'Ambulatory Pacu Nurse'", async () => {
    const searchObj = {
      search: "Ambulatory Pacu Nurse",
      selectedFilters: {
        job_type: [],
        work_schedule: [],
        experience: [],
        department: [],
      },
      sorts: {},
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `http://localhost:3000/api/jobs?search=${base64SearchObj}`;
    const res = await fetch(url);
    expect(res.status).toEqual(200);
    expect(res.body).not.toBeNull();
    const data = await res.json();
    const jobs = data.jobs;
    expect(jobs.length).toEqual(2);
    expect(jobs[0].items.length).toEqual(1);
    expect(jobs[1].items.length).toEqual(1);
    const job1 = jobs[0].items[0];
    const job2 = jobs[0].items[1];

    expect(JSON.stringify(job1)).toContain("Ambulatory Pacu Nurse");
  });
});

// jobs with filters
describe("GET jobs - specific filters:", () => {
  it("should get all jobs from every hospital that are per-diem", async () => {
    const searchObj = {
      search: "",
      selectedFilters: {
        job_type: ["Per-Diem"],
        work_schedule: [],
        experience: [],
        department: [],
      },
      sorts: {},
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `http://localhost:3000/api/jobs?search=${base64SearchObj}`;
    const res = await fetch(url);
    expect(res.status).toEqual(200);
    expect(res.body).not.toBeNull();
    const data = await res.json();
    const jobs = data.jobs;
    expect(jobs.length).toEqual(13);
    expect(jobs[0].items.length).toEqual(2);
    expect(jobs[1].items.length).toEqual(2);
    const totalJobs = jobUtilities.sumJobsInSearch(jobs);
    expect(totalJobs).toEqual(22);
  });

  it(`should get all jobs from every hospital that are:
     per-diem,
      night-shift,
       Experience = Intermediate
       department: ["Pathology & Laboratory Medicine"]`, async () => {
    const searchObj = {
      search: "",
      selectedFilters: {
        job_type: ["Per-Diem"],
        work_schedule: ["Night shift"],
        experience: ["Intermediate"],
        department: ["Pathology & Laboratory Medicine"],
      },
      sorts: {},
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `http://localhost:3000/api/jobs?search=${base64SearchObj}`;
    const res = await fetch(url);
    expect(res.status).toEqual(200);
    expect(res.body).not.toBeNull();
    const data = await res.json();
    const jobs = data.jobs;
    expect(jobs.length).toEqual(2);
    expect(jobs[0].items.length).toEqual(1);
    expect(jobs[1].items.length).toEqual(1);
    const totalJobs = jobUtilities.sumJobsInSearch(jobs);
    expect(totalJobs).toEqual(2);
    const job1 = jobs[0].items[0];
    const job2 = jobs[1].items[0];
    expect(job1.job_title).toEqual("Oncology Nurse");
    expect(job2.job_title).toEqual("LPN RN Telemetry");
  });
});
// jobs with search and filters
describe("GET jobs - specific search AND filters:", () => {
  it(`should get all jobs from every hospital that are:
     per-diem,
      night-shift,
       Experience = Intermediate
       department: ["Pathology & Laboratory Medicine"]
       AND that have the text "onco"
       `, async () => {
    const searchObj = {
      search: "onco",
      selectedFilters: {
        job_type: ["Per-Diem"],
        work_schedule: ["Night shift"],
        experience: ["Intermediate"],
        department: ["Pathology & Laboratory Medicine"],
      },
      sorts: {},
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `http://localhost:3000/api/jobs?search=${base64SearchObj}`;
    const res = await fetch(url);
    expect(res.status).toEqual(200);
    expect(res.body).not.toBeNull();
    const data = await res.json();
    const jobs = data.jobs;
    expect(jobs.length).toEqual(1);
    expect(jobs[0].items.length).toEqual(1);
    const totalJobs = jobUtilities.sumJobsInSearch(jobs);
    expect(totalJobs).toEqual(1);
    const job1 = jobs[0].items[0];
    expect(job1.job_title).toEqual("Oncology Nurse");
  });
});

// jobs with a search obj that doesn't match spec
describe("GET jobs - queries that must fail", () => {
  it(`tries to get jobs with a bad query object`, async () => {
    const searchObj = {
      search: "onco",
      sorts: {},
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `http://localhost:3000/api/jobs?search=${base64SearchObj}`;
    const res = await fetch(url);
    expect(res.status).toEqual(406);
    expect(res.body).not.toBeNull();
    const data = await res.json();
    expect(data.message).toEqual(
      "Your search object is not acceptable or does not have required fields"
    );
  });

  it(`tries to get jobs with filters that do not exist`, async () => {
    const searchObj = {
      search: "",
      selectedFilters: {
        job_type: ["Per-iem"],
        work_schedule: ["Night hift"],
        experience: ["Intemediate"],
        department: ["pathaboratory Medicine"],
      },
      sorts: {},
    };

    const base64SearchObj = btoa(JSON.stringify(searchObj));
    const url = `http://localhost:3000/api/jobs?search=${base64SearchObj}`;
    const res = await fetch(url);
    expect(res.status).toEqual(406);
    expect(res.body).not.toBeNull();
    const data = await res.json();
    expect(data.message).toEqual(
      "Your search filters contain filters that do not exist"
    );
  });
});
