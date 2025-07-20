class ButtonComp extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        p { color: green; }
      </style>
      <p>This is a custom element!</p>
    `;
    console.log("comp spwaned");
  }

}

// Define the custom element
customElements.define('button-comp', ButtonComp);

