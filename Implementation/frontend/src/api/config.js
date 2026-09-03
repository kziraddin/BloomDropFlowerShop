import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5500";

export default axios.create({
  baseURL: API_BASE_URL,
});
