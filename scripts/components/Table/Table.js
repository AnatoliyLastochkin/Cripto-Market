export default class Table {
  constructor({element, data}) {
    this._el = element;
    this._data = data;
    console.log(this._data);
    this._render()
  }

  _render() {
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
          ${this._data.map(item => `
            <tr>  
              <td>${item.name}</td>
              <td>${item.symbol}</td>
              <td>${item.rank}</td>
              <td>${item.price}</td>
            </tr>
          `).join('')}
          
        </tbody>
      </table>
    `;
  }
}