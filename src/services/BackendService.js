import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice"; // Importe a action logout

const API_BASE_URL = "http://localhost:3000";

const ApiRb = axios.create({
  baseURL: `${API_BASE_URL}/backend/v1`,
});

// Interceptor para requests
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

// Para quando a resposta for 401
ApiRb.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
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
