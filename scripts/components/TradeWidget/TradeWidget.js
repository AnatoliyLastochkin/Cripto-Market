import Component from '../Component/Component.js';

export default class TradeWidget extends Component {
  constructor({element}) {
    super();
    this._el = element;

    this._el.addEventListener('input', evt => {
      const value = +evt.target.value;
      this._updateDisplay(value);
    })

    this._el.addEventListener('click', evt => {
      evt.preventDefault();

      if (evt.target.closest('[data-action="close"]')) {
        this.close()
      }

      if (evt.target.closest('[data-action="buy"]')) {
        let buyEvent = new CustomEvent('buy', {
          detail: {
            item: this._currentItem,
            amount: +this._el.querySelector('#amount').value
          }
        });
        this._el.dispatchEvent(buyEvent)
      }
    });
  }

  close() {
    this._el.querySelector('.modal').classList.remove('open');
  }

  trade(item) {
    this._currentItem = item;
    this._total = item.price * 0;
    this._render(item);
  }

  _updateDisplay(value) {
    this._totalEl = this._el.querySelector('#item-total');
    this._totalEl.textContent = this._currentItem.price * value;
  }

  _render(item) {
    this._el.innerHTML = `
      <div id="modal" class="modal open">
        <div class="modal-content">
          <h4>Buying${item.name}:</h4>
          <p>
            Current price: ${item.price}. Total: <span id="item-total">${this._total}</span>
          </p>
          <div class="row">
            <form class="col s12">
              <div class="input-field col s4">
                <input type="text" id="amount">
                <label for="amount">Amount</label>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <a href="#!" data-action="buy" class="modal-buy waves-effect waves-teal btn-flat">Buy</a>
          <a href="#!" data-action="close" class="modal-close waves-effect waves-teal btn-flat">Cancel</a>
        </div>
      </div>  
    `;

  }
}