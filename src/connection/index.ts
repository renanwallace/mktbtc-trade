import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

export default function createInstance(config: AxiosRequestConfig): AxiosInstance {
  return axios.create(config);
}
