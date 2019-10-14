import { Response, Request } from "express";
import { AxiosResponse, AxiosError } from "axios";
import dataApi from "../integrations/marketBitcoin/dataApi";

async function coinInfo(req: Request, res: Response) {
  dataApi(req.params.coin, req.params.method)
    .ticker()
    .then((response: AxiosResponse) => res.status(200).json(response.data))
    .catch((erro: AxiosError) => res.send({ error: erro.message }));
}

export default coinInfo;
