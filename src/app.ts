import express, { Application } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import debug from 'debug';
import router from './router';
import config from './config';
import pkg from '../package.json';
const app: Application = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

debug(`${pkg.name}:${pkg.main}`);

app.listen(config.PORT, () => {
  console.info(`
  Server rodando em: http://localhost:${config.PORT}
  Modo:(${config.NODE_ENV})\n
  `);
});

export default app;