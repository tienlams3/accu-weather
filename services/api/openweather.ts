import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const openWeatherApi = axios.create({
  baseURL: process.env.OPEN_WEATHER_BASE_URL,
  timeout: 10000,
});

openWeatherApi.interceptors.request.use(function (
  config: InternalAxiosRequestConfig
) {
  const API_KEY = process.env.OPEN_WEATHER_API_KEY;
  if (config.params) {
    config.params.set("appid", API_KEY);
    config.params.set("units", "metric");
  }
  return config;
});

openWeatherApi.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function ({ response }) {
    const error = {
      url: `${response.config.baseURL}${response.config.url}`,
      status: response.status,
      message: response.data.message || "Internal Server Error",
    };
    return Promise.reject(error);
  }
);

export default openWeatherApi;
