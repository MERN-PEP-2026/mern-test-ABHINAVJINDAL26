import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
};

export default client;
