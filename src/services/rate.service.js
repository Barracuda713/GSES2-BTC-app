import axios from 'axios';

import { PUBLIC_API_CRYPTO } from '../common/constants/api.constants.js';
import { ENV, HttpMethod } from '../common/enums/enums.js';

const {
  routes: {
    CRYPTO_PRICE: getCryptoPriceURL
  }
} = PUBLIC_API_CRYPTO;

class RateService {
  async getPrice({
    symbol, 
    amount, 
    convert
  }) {
    return axios({
      method: HttpMethod.GET,
      url: getCryptoPriceURL,
      params: {
        symbol,
        amount,
        convert
      },
      headers: {
        'X-CMC_PRO_API_KEY': ENV.API.CMC_KEY,
        'Content-Type': 'application/json'
      }
    }).catch(error => console.error(error.toJSON()));
  }
}

export const rateService = new RateService();