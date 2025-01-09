import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "https://udharimate-9fqi.onrender.com/api/v1",
    timeout: 10000, // Set a timeout (in milliseconds) ,
    withCredentials: true, // Important: This enables cookies to be sent and received
  });
  export default AxiosInstance
