import { createInstance } from '../../connection';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from '../../config';

const requestConfig: AxiosRequestConfig = {
  baseURL: config.BASE_URL,
  timeout: 2200,
};

const connection: AxiosInstance = createInstance(requestConfig);

const dataApi = (coin: string, method: string) => {
  return {
    BTC: {
      ticker: () => connection.get(`${config.API_PATH + coin}/${method}/`),
      orderbook: () => connection.get(`${config.API_PATH + coin}/${method}/`),
      trades: () => connection.get(`${config.API_PATH + coin}/${method}/`),
    }
  }
};

export default dataApi;