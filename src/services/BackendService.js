import axios from "axios";
import { store } from "../app/store";

const API_BASE_URL = "http://localhost:3000";

const ApiRb = axios.create({
  baseURL: `${API_BASE_URL}/backend/v1`,
});

ApiRb.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.access_token;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const get = (url, params = {}) => ApiRb.get(url, { params });

const post = (url, data = {}, config = {}, params = {}) =>
  ApiRb.post(url, data, config, { params });

const put = (url, data = {}, config = {}, params = {}) =>
  ApiRb.put(url, data, config, { params });

const del = (url, data = {}, config = {}, params = {}) =>
  ApiRb.delete(url, data, config, { params });

export default {
  get,
  post,
  put,
  del,
};
