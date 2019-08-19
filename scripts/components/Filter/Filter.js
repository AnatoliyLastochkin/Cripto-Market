import Component from '../Component/Component.js';

export default class Filter extends Component {
  constructor({element}) {
    super();
    this._el = element;

    this.render();

    this.on('input', debounce(evt => {
      let { value } = evt.target;
      let filterEvent = new CustomEvent('filter', {
        detail: value.toLowerCase(),
      });
      this._el.dispatchEvent(filterEvent);
    }, 300));
  }

  render() {
    this._el.innerHTML = `
      <div class="input-field col s4">
        <input type="text">
        <label>Filter</label>
      </div>    
    `;
  }
}

function debounce(f, delay) {
  let timerId;

  return function wrapper(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => { f.apply(this, args)}, delay);
  }
}