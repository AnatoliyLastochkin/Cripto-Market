class App {
  constructor({element}) {
    this._el = element;

    this._render()
  }

  _render() {
    this._el.innerHTML = `
      <div class="row">
        <div class="col s12">
          <h1>Tiny Crypto Market</h1>
        </div>
      </div>
    `;
  }
}