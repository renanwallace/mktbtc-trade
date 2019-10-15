import { Response, Request } from "express";
import { AxiosResponse, AxiosError } from "axios";
import tradeApi from "../integrations/marketBitcoin/tradeApi";

async function sellOrder(req: Request, res: Response) {
  tradeApi()
    .sellOrder(req.body.quantity, req.body.limitPrice)
    .then((response: AxiosResponse) => res.status(200).json(response.data))
    .catch((erro: AxiosError) => res.send({ error: erro.message }));
}

export default sellOrder;
