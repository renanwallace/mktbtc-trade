import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export function createInstance(config: AxiosRequestConfig): AxiosInstance {
  return axios.create(config);
};
