import home from './home';
import coinInfo from './coinInfo';
import trade from './trade'
import { validateInfoRoute, validatePairCoin } from '../middleware'

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
    action: trade,
    method: 'get',
    path: '/trade/orders/:coinPair',
    middleware: [validatePairCoin]
  }
];

export default routes;