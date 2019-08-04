class Table {
  constructor({element}) {
    this._el = element;

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
        <tbody></tbody>
      </table>
    `;
  }
}