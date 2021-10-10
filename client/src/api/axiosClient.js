import axios from 'axios';
import { STATIC_HOST } from '../constants';
// import nProgress from 'nprogress';

const axiosClient = axios.create({
  baseURL: STATIC_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // const token = getToken();

    // if (token && token !== 'undefined') {
    //   config.headers.Authorization = `Bearer ${token}`;
    // } else {
    //   delete API.defaults.headers.common.Authorization;
    // }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const { config, status, data } = error.response;
    // const URLS = ['/api/auth/register', '/api/auth/login'];
    // if (URLS.includes(config.url) && status === 400) {
    //   const errorList = data.data || [];
    //   const firstError = errorList.length > 0 ? errorList[0] : {};
    //   const messageList = firstError.messages || [];
    //   const firstMessage = messageList.length > 0 ? messageList[0] : {};
    //   throw new Error(firstMessage.message);
    // }
    // throw new Error(error.response.data.error);
    return Promise.reject(error.response.data.error);
  }
);

export default axiosClient;
