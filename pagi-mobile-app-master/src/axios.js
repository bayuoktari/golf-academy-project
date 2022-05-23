import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://34.101.235.65:3001/',
  // baseURL: 'http://10.10.100.104:3001/',
  // baseURL: 'https://staging-api-pagi.grt19.com/',
  baseURL: 'https://pagi-api.grt19.com/',
});

export default instance;
