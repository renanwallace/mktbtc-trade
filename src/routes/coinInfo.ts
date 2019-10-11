import { Response, Request } from 'express'
import { AxiosResponse, AxiosError } from 'axios';
import marketBitcoin from '../integrations/marketBitcoin';

const dataApi: any = marketBitcoin.dataApi;

async function coinInfo(req: Request, res: Response) {
  const data = dataApi(req.params.coin, req.params.method);
  data.BTC.ticker()
    .then((response: AxiosResponse) => res.status(200).send(response.data))
    .catch((erro: AxiosError) => res.send({ error: erro.message }));
};

export default coinInfo;