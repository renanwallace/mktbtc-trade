import { createInstance } from '../../connection';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import createSignature from '../../helpers/creteSignature';
import * as qs from 'querystring';
import config from '../../config';
import { now } from '../../helpers/date';

const requestConfig: AxiosRequestConfig = {
  baseURL: config.BASE_URL,
};
const connection: AxiosInstance = createInstance(requestConfig);

const makeRequest = async (data: object) => {
  const queryString = qs.stringify({ ...data, tapi_nonce: now() });
  const signature = createSignature(queryString);

  return connection.request({
    url: config.TAPI_PATH,
    method: 'POST',
    headers: {
      "TAPI-ID": config.KEY,
      "TAPI-MAC": signature
    },
    data: queryString
  });
};

const listOrders = async (
  coin_pair: string = 'BRLBTC'
): Promise<AxiosResponse> => makeRequest({
  tapi_method: 'list_orders',
  coin_pair
});

const accountInfo = async ():
  Promise<AxiosResponse> => makeRequest({
    tapi_method: 'get_account_info'
  });


const getOrder = async (
  order_id: number,
  coin_pair: string = 'BRLBTC'
): Promise<AxiosResponse> => makeRequest({
  tapi_method: 'get_order',
  order_id, coin_pair
});


const listOrderBook = async (
  full: boolean = false,
  coin_pair: string = 'BRLBTC'
): Promise<AxiosResponse> => makeRequest({
  tapi_method: 'list_orderbook',
  coin_pair,
  full
});


const buyOrder = async (
  quantity: string,
  limitPrice: string,
  coin_pair: string = 'BRLBTC'
): Promise<AxiosResponse> => makeRequest({
  tapi_method: 'place_buy_order',
  coin_pair,
  quantity,
  limitPrice
});



export default function tradeApi() {
  return {
    listOrders,
    accountInfo,
    getOrder,
    listOrderBook,
    buyOrder
  }
};