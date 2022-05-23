import axios from "axios";

const instance = axios.create({
  baseURL: "https://pagi-api.grt19.com/",
  // baseURL: "http://localhost:3001/",
  // baseURL: "https://staging-api-pagi.grt19.com/",
});

// instance.interceptors.request.use((req) => {
//   console.log(req);
//   // req.headers["Access-Control-Allow-Origin"] = "*";
// });

export default instance;
