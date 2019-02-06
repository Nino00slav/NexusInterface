class ModuleEncapsulater extends HTMLElement {
  constructor() {
    super();
    const mountPoint = document.createElement('span');
    this.shadow = this.createShadowRoot().appendChild(mountPoint);
    // this.shadow.innerHTML = '<h1>Loading...</h1>';

    console.log(this.shadow);
  }

  get shadowRoot() {
    return this.shadow;
  }

  connectedCallback() {
    // const mountPoint = document.createElement('span');
    // this.shadow = this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    console.log('connected');
  }

  disconnectedCallback() {
    // this.shadow = null;
    // this.shadow = this.createShadowRoot().appendChild(mountPoint);
    console.log('disconnected');
  }
}

customElements.define('new-module', ModuleEncapsulater);
export default new ModuleEncapsulater();
