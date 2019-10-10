import { Response, Request } from 'express'
import { AxiosResponse, AxiosError } from 'axios';
import marketBitcoin from '../integrations/marketBitcoin';

const dataApi: any = marketBitcoin.dataApi;

async function coinInfo(req: Request, res: Response) {
  const data = dataApi(req.params.coin, req.params.method);
  const response = await data.BTC.ticker()
    .then((res: AxiosResponse) => res.data)
    .catch((erro: AxiosError) => console.log('Deu erro!', erro.message))

  res.send(response);
}

export default coinInfo;