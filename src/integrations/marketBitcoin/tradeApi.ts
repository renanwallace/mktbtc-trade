import { createInstance } from '../../connection';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import crypto from 'crypto';
import * as qs from 'querystring';
import config from '../../config';
import { now } from '../../helpers/date';

const requestConfig: AxiosRequestConfig = {
  baseURL: config.BASE_URL,
};
const connection: AxiosInstance = createInstance(requestConfig);


const listOrders = async (coin_pair: string) => {
  const queryString = qs.stringify({ tapi_method: 'list_orders', tapi_nonce: now(), coin_pair });
  const signature = crypto
    .createHmac("sha512", config.SECRET)
    .update(config.TAPI_PATH + "?" + queryString)
    .digest("hex");

  return connection.request({
    url: config.TAPI_PATH,
    method: 'POST',
    headers: {
      "TAPI-ID": config.KEY,
      "TAPI-MAC": signature
    },
    data: queryString
  });
}

export default function tradeApi() {
  return { listOrders }
};