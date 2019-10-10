import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import debug from 'debug';
import router from './router';
import config from './config';
import pkg from '../package.json';
const app: Application = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(logger(config.LOG_TYPE));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

async function ignoreFavicon(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
};

app.use(ignoreFavicon);

debug(`${pkg.name}:${pkg.main}`);

app.listen(config.PORT, () => {
  console.info(`
  Server rodando em: http://localhost:${config.PORT}
  Modo:(${config.NODE_ENV})\n
  `);
});

export default app;