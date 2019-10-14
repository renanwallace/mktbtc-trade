import { Response, Request } from "express";
import { AxiosResponse, AxiosError } from "axios";
import tradeApi from "../integrations/marketBitcoin/tradeApi";

async function getOrder(req: Request, res: Response) {
  tradeApi()
    .getOrder(Number(req.params.orderId))
    .then((response: AxiosResponse) => res.status(200).json(response.data))
    .catch((erro: AxiosError) => res.send({ error: erro.message }));
}

export default getOrder;
