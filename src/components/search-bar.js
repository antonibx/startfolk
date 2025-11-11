import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

class SearchBar extends LitElement {
  static properties = { query: { type: String } };

  static styles = css`
    :host { display: block }
    .wrap { display: block; position: relative }
    .icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
    .icon svg { width: 18px; height: 18px; fill: #999 }
    .wrap:focus-within .icon svg { fill: #ff8c00 }
    input { 
      width: 100%; 
      padding: 12px 16px 12px 44px; 
      font-size: 15px; 
      border: 1px solid #ddd; 
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.98);
      font-family: var(--app-font, inherit);
      transition: all 0.2s ease;
    }
    input:focus {
      outline: none;
      border-color: #ff8c00;
      box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
    }
    input::placeholder {
      color: #999;
    }
  `;

  constructor() {
    super();
    this.query = '';
  }

  render() {
    return html`
      <div class="wrap">
        <span class="icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.2 5.01 12.19 2 8.6 2S2 5.01 2 8.39 5.01 14.78 8.6 14.78c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6.9 0C5.86 14 3.5 11.64 3.5 8.89S5.86 3.78 8.6 3.78s5.1 2.36 5.1 5.11-2.36 5.11-5.1 5.11z"/>
          </svg>
        </span>
        <input
          type="search"
          placeholder="Search for Star Wars characters..."
          .value=${this.query}
          @input=${this._onInput}
          aria-label="Buscar personajes"
        />
      </div>
    `;
  }

  _onInput(e) {
    this.query = e.target.value;
    this.dispatchEvent(new CustomEvent('search', { detail: { query: this.query }, bubbles: true, composed: true }));
  }
}

customElements.define('search-bar', SearchBar);
