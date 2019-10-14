import home from './home';
import coinInfo from './coinInfo';
import listOrders from './listOrders';
import accountInfo from './accountInfo';
import getOrder from './getOrder';
import listOrderBook from './listOrderBook';
import buyOrder from './buyOrder';
import { validateInfoRoute, validatePairCoin, validateBuySellOrder } from '../middleware'
import { Handler, RequestHandler } from 'express';
import { PathParams } from 'express-serve-static-core';

export interface Route {
  action: Handler;
  method: string;
  path: PathParams;
  middleware: RequestHandler[];
};

const routes: Route[] = [
  {
    action: home,
    method: 'get',
    path: '/',
    middleware: []
  },
  {
    action: coinInfo,
    method: 'get',
    path: '/info/:coin/:method',
    middleware: [validateInfoRoute]
  },
  {
    action: listOrders,
    method: 'get',
    path: '/trade/info/orders/:coinPair',
    middleware: [validatePairCoin]
  },
  {
    action: accountInfo,
    method: 'get',
    path: '/trade/info/account',
    middleware: []
  },
  {
    action: getOrder,
    method: 'get',
    path: '/trade/info/order/:orderId',
    middleware: []
  },
  {
    action: listOrderBook,
    method: 'get',
    path: '/trade/info/listOrderBook',
    middleware: []
  },
  {
    action: buyOrder,
    method: 'post',
    path: '/trade/place/buy',
    middleware: [validateBuySellOrder]
  }
];

export default routes;