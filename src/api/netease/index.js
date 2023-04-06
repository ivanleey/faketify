import axios from "axios";

// const api = "/personalized?limit=100";
export const apiConfig = {
  timeout: 30000,
  baseURL: "http://localhost:3000",
};

const api = axios.create(apiConfig);

export default api;
