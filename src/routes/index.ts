import home from './home';
import { Handler, RequestHandler } from 'express';
import { PathParams } from 'express-serve-static-core';

export interface Route {
  action: Handler;
  method: string;
  path: PathParams;
  middleware: RequestHandler | undefined;
};

const routes: Route[] = [
  {
    action: home,
    method: 'get',
    path: '/',
    middleware: undefined
  }
];

export default routes;