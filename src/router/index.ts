import express from 'express';
import { Route } from '../routes';
import routes from '../routes';
const router: any = express.Router();

const createRoutes = (routes: Route[]) =>
  routes.map(route => (route.middleware)
    ? router[route.method](route.path, ...route.middleware, route.action)
    : router[route.method](route.path, route.action)
  );

createRoutes(routes);

export default router;