import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import { ApiService } from '../services/api.js';

class FeaturedCharacters extends LitElement {
  static properties = {
    featured: { type: Array },
    selectedId: { state: true },
    _loading: { state: true },
    _error: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      min-width: 200px;
    }

    aside {
      background: rgba(255, 255, 255, 0.95);
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      min-height: 300px;
      display: flex;
      flex-direction: column;
    }

    .featured-list {
      list-style: none;
      padding: 0;
      margin: 0;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .featured-item {
      padding: .5rem;
      margin-bottom: .7rem;
      background: #f9f7f7;
      border-radius: 6px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s ease;
    }
    .featured-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .featured-item:hover {
      background: #f1efef;
      transform: translateX(2px);
    }
    .featured-item img {
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
      filter: invert(1) brightness(70%) invert(1);
    }
    .featured-info {
      flex: 1;
    }
    h3 {
      margin: 0 0 1.5rem 0;
      font-size: 1.1em;
      font-weight: 500;
      color: #666;
    }
    .name {
      font-weight: 500;
      color: #2c3e50;
    }
    .meta {
      font-size: 0.85em;
      color: #666;
    }
    .loading {
      color: #666;
      padding: 12px;
      text-align: center;
      font-size: 0.9em;
    }
    .error {
      color: #e74c3c;
      padding: 12px;
      text-align: center;
      font-size: 0.9em;
    }
    .featured-item.active {
      background: #ff8c00;
      color: #fff;
      border-color: rgba(0,0,0,0.06);
    }
    .featured-item.active .name {
      color: #fff;
    }
    .featured-item.active img {
      filter: brightness(0) invert(1);
    }
    .aside-footer {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85em;
      color: #999;
      padding-top: 8px;
    }
    .aside-footer a {
      color: #ff8c00;
      font-weight: 600;
    }
  `;

  constructor() {
    super();
    this.featured = [];
    this._loading = true;
    this._error = null;
    this.selectedId = null;
    this._loadFeatured();
  }

  connectedCallback() {
    super.connectedCallback();
    this._onHashChange = this._onHashChange.bind(this);
    window.addEventListener('hashchange', this._onHashChange);
    this._onHashChange();
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this._onHashChange);
    super.disconnectedCallback();
  }

  _onHashChange() {
    const match = location.hash && location.hash.match(/^#\/profile\/(\d+)/);
    if (match) {
      this.selectedId = Number(match[1]);
    } else {
      this.selectedId = null;
    }
  }

  async _loadFeatured() {
    try {
      this._loading = true;
      this._error = null;
      this.featured = await ApiService.getFeaturedCharacters();
    } catch (err) {
      this._error = 'Error al cargar destacados';
      this.featured = [];
    } finally {
      this._loading = false;
    }
  }

  _selectCharacter(id) {
    this.dispatchEvent(new CustomEvent('select-character', {
      detail: { id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <aside>
        <h3>Featured Characters:</h3>
        ${this._loading 
          ? html`<div class="loading">Loading featured...</div>`
          : this._error
            ? html`<div class="error">${this._error}</div>`
              : html`
                <ul class="featured-list">
                  ${this.featured.map(char => html`
                    <li class=${'featured-item' + (this.selectedId === char.id ? ' active' : '')} @click=${() => this._selectCharacter(char.id)}>
                      <img src="./src/assets/${char.side === 'dark' ? 'dark' : 'light'}.png" alt="${char.side} side" />
                      <div class="featured-info">
                        <div class="name">${char.name}</div>
                        <!--div class="meta">${char.role}</div-->
                      </div>
                    </li>
                  `)}
                </ul>
                <div class="aside-footer">
                  <div>2025 Star Wardens LTD.</div> |
                  <div><a href="#/about">About us</a></div>
                </div>
              `}
      </aside>
    `;
  }
}

customElements.define('featured-characters', FeaturedCharacters);