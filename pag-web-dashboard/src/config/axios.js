import axios from "axios";

const instance = axios.create({
  baseURL: "https://pagi-api.grt19.com/",
  // baseURL: "https://staging-api-pagi.grt19.com/",
  // baseURL: "http://localhost:3001/",
});

export default instance;
