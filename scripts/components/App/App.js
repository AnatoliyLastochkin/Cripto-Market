import Filter from '../Filter/Filter.js';
import Table from '../Table/Table.js';
import Portfolio from '../Portfolio/Portfolio.js';
import TradeWidget from '../TradeWidget/TradeWidget.js';
import {dataService} from '../Services/DataServuce.js';

import './App.css';

export default class App {
  constructor({element}) {
    this._el = element;
    this._userBalance = 10000;
    this._render();


    dataService.getCurrencies().then(data => {
      this._data = data;
      this._initTable();
      this._initFilter();
    });

    this._initPortfolio();
    this._initTradeWidget();
  }

  _tradeItem(id) {
    const coin = this._data.find(coin => coin.id === id);
    this._tradeWidget.trade(coin);
  }

  _initTable() {
   this._table = new Table({
     element: this._el.querySelector('[data-element="table"]'),
     data: this._data,
     });

    this._table.on('rowClick', evt => this._tradeItem(evt.detail))
  }

  _initFilter() {
    this._filter = new Filter({
      element: this._el.querySelector('[data-element="filter"]')
    });

    this._filter.on('filter', async evt => {
      const filterValue = evt.detail;
      const filterdData = await dataService.getCurrencies({ filter: filterValue })
      this._table.update(filterdData)
    })
  }

  _initPortfolio() {
    this._portfolio = new Portfolio({
      element: this._el.querySelector('[data-element="portfolio"]'),
      balance: this._userBalance,
    });
  }

  _initTradeWidget() {
    this._tradeWidget = new TradeWidget({
      element: this._el.querySelector('[data-element="portfolio"]'),
    });

    this._tradeWidget.on('buy', evt => {
      const {item, amount} = evt.detail;

      const purchasePrice = item.price * amount;
      this._userBalance -= purchasePrice;

      this._portfolio.addItem(item, amount);
      this._portfolio.updateBalance(this._userBalance);
    })
  }

  _render() {
    this._el.innerHTML = `
      
      <div class="row">
        <div class="col s12">
          <h1 class="title">Tiny Crypto Market</h1>
        </div>
      </div>
      
      <div class="row">
        <div class="col s12" data-element="filter"></div>
      </div>
      
      <div class="row">
        <div class="col s12" data-element="table"></div>
      </div>
      
      <div class="col s6 offset-s6 portfolio" data-element="portfolio"></div>
      <div data-element="tradeWidget"></div>
    `;
  }
}

