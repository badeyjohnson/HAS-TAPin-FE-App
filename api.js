/* eslint-disable no-console */
import axios from 'axios';

const BASE_URL = `https://hastapin.appspot.com/api/`;

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
  return riskAssessments;
};

export const fetchRiskAssessment = async (siteId, SSRAid) => {
  const {
    data: { riskAssessment }
  } = await axios.get(`${BASE_URL}sites/${siteId}/${SSRAid}`);
  return riskAssessment;
};

export const updateRiskAssessment = async (siteId, assessment) => {
  const {
    data: { riskAssessment }
  } = await axios.post(
    `${BASE_URL}sites/${siteId}/risk_assessments`,
    assessment
  );
  return riskAssessment;
};

export const fetchMapBySiteId = async siteId => {
  const {
    data: { map }
  } = await axios.get(`${BASE_URL}maps/${siteId}`);
  return map;
};

export const linkUserToJob = async (user, jobNo) => {
  const { data } = await axios.post(`${BASE_URL}users/${user}/jobs/link`, {
    job_no: jobNo
  });
  return data;
};
