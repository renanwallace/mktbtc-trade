import home from './home';

export interface Route {
  action: Function;
  method: string;
  path: string,
  middleware: any
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