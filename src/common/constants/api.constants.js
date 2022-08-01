const PUBLIC_API_CRYPTO = {
  routes: {
    CRYPTO_PRICE: 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion'
  },
  defaultParams: {
    convert: 'UAH',
    amount: 1,
    symbol: 'BTC'
  }
};

export { PUBLIC_API_CRYPTO };
