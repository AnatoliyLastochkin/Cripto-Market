export default class Component  {
  constructor(element) {
    this.element = element;

  }

  on(eventType, callback) {
    this._el.addEventListener(eventType, callback)
  }
}