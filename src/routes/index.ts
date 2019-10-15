import { Handler, RequestHandler } from "express";
import { PathParams } from "express-serve-static-core";
import { validateBuyOrder, validateInfoRoute, validateSellOrder, validatePairCoin } from "../middleware";
import accountInfo from "./accountInfo";
import buyOrder from "./buyOrder";
import coinInfo from "./coinInfo";
import getOrder from "./getOrder";
import home from "./home";
import listOrderBook from "./listOrderBook";
import listOrders from "./listOrders";
import sellOrder from "./sellOrder";

export interface Route {
  action: Handler;
  method: string;
  path: PathParams;
  middleware?: RequestHandler[];
}

const routes: Route[] = [
  {
    action: home,
    method: "get",
    path: "/"
  },
  {
    action: coinInfo,
    method: "get",
    path: "/info/:coin/:method",
    middleware: [validateInfoRoute]
  },
  {
    action: listOrders,
    method: "get",
    path: "/trade/info/orders/:coinPair",
    middleware: [validatePairCoin]
  },
  {
    action: accountInfo,
    method: "get",
    path: "/trade/info/account",
    middleware: []
  },
  {
    action: getOrder,
    method: "get",
    path: "/trade/info/order/:orderId",
    middleware: []
  },
  {
    action: listOrderBook,
    method: "get",
    path: "/trade/info/listOrderBook",
    middleware: []
  },
  {
    action: buyOrder,
    method: "post",
    path: "/trade/place/buy",
    middleware: [validateBuyOrder]
  },
  {
    action: sellOrder,
    method: "post",
    path: "/trade/place/sell",
    middleware: [validateSellOrder]
  }
];

export default routes;
