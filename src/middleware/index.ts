import { Request, Response, NextFunction } from 'express';
import method from '../enum/method';
import { validsCoinPair } from '../enum/coinPair'
import { validCoins } from '../enum/coin';

export async function validateInfoRoute(req: Request, res: Response, next: NextFunction) {
  if (!method.includes(req.params.method) || !validCoins.includes(req.params.coin)) {
    console.log('Parâmetros invalidos para a rota:', req.params)
    res.status(404)
      .json({ error: 'coin or method invalids' });
  } else {
    next();
  }
}

export async function invalidRequest(req: Request, res: Response) {
  console.log(req)
  res.status(404)
    .json({
      error: {
        'name': '',
        'status': 404,
        'message': 'Invalid Path',
        'statusCode': 404
      }
    });
};

export async function validePairCoin(req: Request, res: Response, next: NextFunction) {
  if (!validsCoinPair.includes(req.params.pairCoin)) {
    console.log('Parâmetros invalidos para a rota:', req.params)
    res.status(400)
      .json({
        error: {
          'name': 'Invalid Request',
          'status': 400,
          'message': 'Invalid coin pair',
          'statusCode': 400
        }
      });
  } else {
    next();
  }
}