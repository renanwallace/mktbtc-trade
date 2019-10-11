import { Request, Response, NextFunction } from 'express';
import method from '../enum/method';
import { validCoins } from '../enum/coin';

export async function validateInfoRoute(req: Request, res: Response, next: NextFunction) {
  if (!method.includes(req.params.method) || !validCoins.includes(req.params.coin)) {
    console.log('Parâmetros invalidos para a rota:', req.params)
    res.status(404)
    res.json({ error: 'coin or method invalids' })
  } else {
    next();
  }
}

export async function invalidRequest(req: Request, res: Response) {
  console.log(req)
  res.status(404)
    .json({
      error: {
        'name': 'Invalid Path',
        'status': 404,
        'message': 'Invalid Request',
        'statusCode': 404
      }
    });
};
