import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as qs from "querystring";
import config from "../../config";
import { createInstance } from "../../connection";
import createSignature from "../../helpers/creteSignature";
import { now } from "../../helpers/date";

const requestConfig: AxiosRequestConfig = {
  baseURL: config.BASE_URL,
};
const connection: AxiosInstance = createInstance(requestConfig);

const makeRequest = async (data: object) => {
  const queryString = qs.stringify({ ...data, tapi_nonce: now() });
  const signature = createSignature(queryString);

  return connection.request({
    url: config.TAPI_PATH,
    method: "POST",
    headers: {
      "TAPI-ID": config.KEY,
      "TAPI-MAC": signature
    },
    data: queryString
  });
};

const listOrders = async (coinPair: string = "BRLBTC")
  : Promise<AxiosResponse> => makeRequest({
    coin_pair: coinPair,
    tapi_method: "list_orders"
  });

const accountInfo = async ()
  : Promise<AxiosResponse> => makeRequest({
    tapi_method: "get_account_info"
  });

const getOrder = async (orderId: number, coinPair: string = "BRLBTC")
  : Promise<AxiosResponse> => makeRequest({
    coin_pair: coinPair,
    order_id: orderId,
    tapi_method: "get_order"
  });

const listOrderBook = async (full: boolean = false, coinPair: string = "BRLBTC")
  : Promise<AxiosResponse> => makeRequest({
    coin_pair: coinPair,
    full,
    tapi_method: "list_orderbook"
  });

const buyOrder = async (quantity: string, limitPrice: string, coinPair: string = "BRLBTC")
  : Promise<AxiosResponse> => makeRequest({
    coin_pair: coinPair,
    limitPrice,
    quantity,
    tapi_method: "place_buy_order"
  });

export default function tradeApi() {
  return {
    accountInfo,
    buyOrder,
    getOrder,
    listOrderBook,
    listOrders
  };
}
