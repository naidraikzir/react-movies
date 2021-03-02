import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL,
  timeout: 10000,
  params: {
    apikey: process.env.REACT_APP_API_KEY,
  }
});

export default request;
