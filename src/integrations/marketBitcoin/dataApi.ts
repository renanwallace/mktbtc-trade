import createInstance from "../../connection";
import { AxiosInstance, AxiosRequestConfig, AxiosPromise } from "axios";
import config from "../../config";

const requestConfig: AxiosRequestConfig = {
  baseURL: config.BASE_URL,
  timeout: 2200,
};

const connection: AxiosInstance = createInstance(requestConfig);

interface DataApi {
  ticker: () => AxiosPromise;
  orderbook: () => AxiosPromise;
  trades: () => AxiosPromise;
}

export default function dataApi(coin: string, method: string): DataApi {
  return {
    ticker: () => connection.get(`${config.API_PATH + coin}/${method}/`),
    orderbook: () => connection.get(`${config.API_PATH + coin}/${method}/`),
    trades: () => connection.get(`${config.API_PATH + coin}/${method}/`),
  };
}
