import { Response, Request } from 'express'
import { AxiosResponse, AxiosError } from 'axios';
import tradeApi from '../integrations/marketBitcoin/tradeApi';

async function buyOrder(req: Request, res: Response) {
  tradeApi().buyOrder(req.body.quantity, req.body.limitPrice)
    .then((response: AxiosResponse) => res.status(200).json(response.data))
    .catch((erro: AxiosError) => res.send({ error: erro.message }));
};

export default buyOrder;