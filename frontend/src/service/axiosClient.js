import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || '/';
export const axiosClient = axios.create({
  baseURL: baseUrl,
});
