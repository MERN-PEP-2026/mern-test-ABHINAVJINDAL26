
import axios from "axios";

const resolvedBase = import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? "http://localhost:5000" : "");
const BASE = resolvedBase.replace(/\/$/, "");

const httpClient = axios.create({ baseURL: BASE });

/* attach or detach the Bearer token for all future requests */
export function applyToken(jwt) {
  if (jwt) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
  }
}

export default httpClient;
