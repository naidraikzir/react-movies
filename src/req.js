import axios from 'axios';

const request = axios.create({
  baseURL: 'https://omdbapi.com',
  timeout: 10000,
  params: {
    apikey: process.env.REACT_APP_API_KEY,
  }
});

export const { get } = request;
