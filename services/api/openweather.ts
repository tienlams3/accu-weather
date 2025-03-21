import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const openWeatherApi = axios.create({
  baseURL: process.env.OPEN_WEATHER_BASE_URL,
  timeout: 10000,
});

openWeatherApi.interceptors.request.use(function (
  config: InternalAxiosRequestConfig
) {
  const API_KEY = process.env.OPEN_WEATHER_API_KEY;
  const params = config.params;
  if (params) {
    params.set("appid", API_KEY);
    params.set("units", "metric");
  }
  return config;
});

openWeatherApi.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function ({ response }) {
    const { config } = response;
    const { baseURL, url } = config;
    const {
      status,
      data: { message },
    } = response;
    const error = {
      url: `${baseURL}${url}`,
      status: status,
      message: message || "Internal Server Error",
    };
    return Promise.reject(error);
  }
);

export default openWeatherApi;
