import { HTTPService } from './HttpService.js';

const COINS_URL = 'https://api.coinpaprika.com/v1/coins';
const getSingleCoinUrl = id => `${COINS_URL}/${id}/ohlcv/latest`;


export const dataService = {
  async getCurrencies(query = { filter: '' }) {
    let promise = HTTPService.sendRequest(COINS_URL);
    let { filter } = query;

    let data = await promise;
    data = data.filter(item => {
      return item.name.toLowerCase().includes(filter)
    }).slice(0, 10);
    return dataService.getCurrenciesPrices(data);

    // return promise.then(data => {
    //   data = data.filter(item => {
    //     return item.name.toLowerCase().includes(filter)
    //   }).slice(0, 10);
    //   return dataService.getCurrenciesPrices(data)
    // }).catch(err => {
    //   console.error(err);
    // });
  },

  getCurrenciesPrices(data) {
    let coinUrls = data.map(coin => getSingleCoinUrl(coin.id));
    return HTTPService.sendMultipleRequests(coinUrls).then(coins => {
      const dataWithPrices = data.map((item, index) =>{
        let coinPrice = coins[index][0] || { close: 0}
        item.price = coinPrice.close;
        return item;
      });
      return dataWithPrices
    })
  }
};

class Mypromise {
  constructor(behaivorFunction) {
    this._status = 'pending';
    this._result = null;
    this._successCallbacks = [];
    this._errorCallbacks = [];
    behaivorFunction(this._resolve.bind(this), this._reject.bind(this));
  }

  then(successCallback, errorCallback = () => {}) {
    if (this._status === 'fulfilled') {
      successCallback(this._result);
    } else if (this._status === 'rejected'){
      errorCallback(this._result)
    } else {
      this._successCallbacks.push(successCallback);
      this._errorCallbacks.push(errorCallback)
    }
  }

  _resolve(data) {
    this._status = 'fulfilled';
    this._result = data;
    this._successCallbacks.forEach(callback => callback(data));
  }

  catch(errorCallback) {
    if (this._status === 'rejected') {
      errorCallback(this._result);
    } else {
      this._errorCallbacks.push(errorCallback);
    }
  }

  _reject(error) {
    this._status = 'rejected';
    this._result = error;
    this._errorCallbacks.forEach(callback => callback(error));
  }

}

