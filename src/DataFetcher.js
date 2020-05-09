const DEFAULT_MAX_CURRENCIES = 10;

class DataFetcher {
  static getCurrencies() {
    return fetch("https://www.stackadapt.com/coinmarketcap/map")
      .then(response => response.json())
      .then(response => {
        const currencies = response.data.slice(0, DEFAULT_MAX_CURRENCIES);

        return fetch(
          `https://www.stackadapt.com/coinmarketcap/quotes?id=${currencies
            .map(currency => currency.id)
            .join(",")}`
        )
          .then(response => response.json())
          .then(response =>
            currencies.map(currency => ({
              rank: currency.rank,
              symbol: currency.symbol,
              price: response.data[currency.id].quote["USD"].price,
            }))
          )
          .catch(() => []);
      })
      .catch(() => []);
  }
}

export default DataFetcher;
