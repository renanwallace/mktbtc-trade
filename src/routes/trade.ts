import { Response, Request } from 'express'
import { AxiosResponse, AxiosError } from 'axios';
import marketBitcoin from '../integrations/marketBitcoin';

const { tradeApi } = marketBitcoin;

async function coinInfo(req: Request, res: Response) {
  const data = tradeApi();
  data.listOrders(req.params.coinPair)
    .then((response: AxiosResponse) => res.status(200).send(response.data))
    .catch((erro: AxiosError) => res.send({ error: erro.message }));
};

export default coinInfo;