import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "https://udharimate-9fqi.onrender.com/api/v1", 
    withCredentials: true, // Important: This enables cookies to be sent and received
  });
  export default AxiosInstance
