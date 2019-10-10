import { Request, Response, NextFunction } from 'express';
import method from '../enum/method';
import { validCoins } from '../enum/coin';

export function validateInfoRoute(req: Request, res: Response, next: NextFunction) {
  console.log(!method.includes(req.params.method));
  console.log(!method.includes(req.params.method));

  if (!method.includes(req.params.method) || !validCoins.includes(req.params.coin)) {
    console.log('Parâmetros invalidos para a rota:', req.params)
    res.status(404)
    res.send({ error: 'coin or method invalids' })
  } else {
    next();
  }
}