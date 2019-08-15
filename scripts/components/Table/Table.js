import Component from '../Component/Component.js'

export default class Table extends Component {
  constructor({element, data }) {
    super();
    this._el = element;

    this._render(data)

    this._el.addEventListener('click', evt => this._onRowClick(evt))
  }

  _onRowClick(evt) {
    const target = evt.target.closest('tbody tr');
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      let clickEvent = new CustomEvent('rowClick', {
        detail: id,
      });
      this._el.dispatchEvent(clickEvent)
    }
  }

  _render(data) {
    this._el.innerHTML = `
      <table class="highlight">
        <thead>
          <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Rank</th>
              <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr data-id="${item.id}">  
              <td>${item.name}</td>
              <td>${item.symbol}</td>
              <td>${item.rank}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          `).join('')}
          
        </tbody>
      </table>
    `;
  }
}