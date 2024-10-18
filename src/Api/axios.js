import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-clone-api-gt35.onrender.com",
});

export {axiosInstance}