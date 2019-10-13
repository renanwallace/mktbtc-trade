import { Request, Response, NextFunction } from 'express';
import method from '../enum/method';
import { validsCoinPair } from '../enum/coinPair'
import { validCoins } from '../enum/coin';
import config from '../config';
import createObjectError from '../helpers/createObjectError';

export async function invalidRequest(req: Request, res: Response) {
  console.log('Requisição Invalida!', req.params, req.header);
  res.status(404)
    .json(createObjectError({
      message: 'Invalid endpoint', code: 404
    }));
};

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const receivedToken: any = req.headers.secure_token || '';
  const decriptedToken = Buffer.from(receivedToken, 'base64').toString();

  if (decriptedToken !== config.SECURE_TOKEN) {
    console.log('Requisição sem token');
    res.status(401)
      .json(createObjectError({
        message: 'Validate if the token was sent or valid', code: 401
      }));
  } else {
    next();
  }
};

export async function validateInfoRoute(req: Request, res: Response, next: NextFunction) {
  if (!method.includes(req.params.method) || !validCoins.includes(req.params.coin)) {
    console.log('Parâmetros invalidos para a rota:', req.params)
    res.status(404)
      .json(createObjectError({
        message: 'coin or method invalids', code: 404
      }));
  } else {
    next();
  }
}

export async function validatePairCoin(req: Request, res: Response, next: NextFunction) {
  if (!validsCoinPair.includes(req.params.coinPair)) {
    console.log('Parâmetros invalidos para a rota:', req.params)
    res.status(400)
      .json(createObjectError({
        message: 'Invalid coin pair', code: 400
      }));
  } else {
    next();
  }
}

export async function validateBuySellOrder(req: Request, res: Response, next: NextFunction) {
  if (parseFloat(req.body.quantity) >= 0.001 && parseFloat(req.body.limitPrice) >= 0.20) {
    next();
  } else {
    console.log('Parâmetros invalidos para a rota:', req.body)
    res.status(400)
      .json(createObjectError({
        message: 'Necessário informar quantidade e valor limite acima do seguro', code: 400
      }));
  }
};