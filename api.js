/* eslint-disable no-console */
import axios from 'axios';

const BASE_URL = `// http://localhost:9090/api/`;

export const fetchUser = async email => {
  const {
    data: { user }
  } = await axios.get(`${BASE_URL}users/${email}`);
  return user;
};


