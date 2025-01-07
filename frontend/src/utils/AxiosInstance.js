import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000, // Set a timeout (in milliseconds) ,
    withCredentials: true, // Important: This enables cookies to be sent and received
  });
  export default AxiosInstance