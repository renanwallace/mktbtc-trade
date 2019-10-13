import crypto from 'crypto';
import config from '../config';

export default function createSignature(queryString: string) {
  return crypto
    .createHmac("sha512", config.SECRET)
    .update(config.TAPI_PATH + "?" + queryString)
    .digest("hex");
};
