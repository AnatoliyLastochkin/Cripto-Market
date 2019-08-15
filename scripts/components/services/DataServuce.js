const COINS_URL = 'https://api.coinpaprika.com/v1/coins';
const getSingleCoinUrl = id => `${COINS_URL}/${id}/ohlcv/latest`;
const HTTPService = {
  sendRequest(url, successCallback, method = 'GET') {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.send();

    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert(`${xhr.status}: ${xhr.statusText}` )
      } else {
        const responseData = JSON.parse(xhr.responseText).slice(0, 10);
        successCallback(responseData)
      }
    }
  },

  sendMultipleRequests(urls, callback) {
    let requestCount = urls.length;
    let results = [ ]

    urls.forEach(url => {
      HTTPService.sendRequest(url, data => {
        results.push({url, data});
        requestCount--;

        if (!requestCount) {
          callback(results)
        }
      })
    })
  }
};
export const dataService = {
  getCurrencies(callback) {
    HTTPService.sendRequest(COINS_URL, data => {
      data = data.slice(0, 10);
      dataService.getCurrenciesPrices(data, callback)
    });

  },

  getCurrenciesPrices(data, callback) {
    let coinIds = data.map(coin => coin.id);
    let coinsIdMap = coinIds.reduce((acc, id) => {
      acc[getSingleCoinUrl(id)] = id;
      return acc;
    }, {});

    HTTPService.sendMultipleRequests(Object.keys(coinsIdMap), coins => {
      const dataWithPrices = data.map(coinData =>{
        let coinPriceUrl = getSingleCoinUrl(coinData.id);
        let [coinPriceData] = coins.find(coin => coin.url === coinPriceUrl).data;

        coinData.price = coinPriceData.close;
        return coinData;
      })
      callback(dataWithPrices);
    })
  }

};