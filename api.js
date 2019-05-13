/* eslint-disable no-console */
import axios from 'axios';

const BASE_URL = `http://localhost:9090/api/`;

export const fetchUser = async email => {
  const {
    data: { user }
  } = await axios.get(`${BASE_URL}users/${email}`);
  return user;
};
export const fetchUserJobs = async email => {
  const {
    data: { jobs }
  } = await axios.get(`${BASE_URL}users/${email}/jobs`);
  return jobs;
};
export const fetchJob = async jobNo => {
  const {
    data: { job }
  } = await axios.get(`${BASE_URL}jobs/${jobNo}`);
  return job;
};

export const fetchSitesByJob = async jobNo => {
  const {
    data: { sites }
  } = await axios.get(`${BASE_URL}jobs/${jobNo}/sites`);
  return sites;
};

export const fetchSitesRisks = async siteId => {
  const {
    data: { riskAssessments }
  } = await axios.get(`${BASE_URL}sites/${siteId}/risk_assessments`);
  // console.log('risk',riskAssessments)
  return riskAssessments;
};

export const linkUserToJob = async (user, jobNo) => {
  const { data } = await axios.post(`${BASE_URL}users/${user}/jobs/link`, {
    job_no: jobNo
  });
  return data;
};

