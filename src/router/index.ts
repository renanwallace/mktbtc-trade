import express, { Router } from "express";
import { Route } from "../routes";
import routes from "../routes";
const router: Router = express.Router();

const createRoutes = (routes: Route[]) =>
  routes.map((route: Route) => {
    (route.middleware)
      ? (router as Router | any)[route.method.toLowerCase()](route.path, route.middleware, route.action)
      : (router as Router | any)[route.method.toLowerCase()](route.path, route.action);
  }
  );

createRoutes(routes);

export default router;
