import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import { ApiService } from '../services/api.js';

class CharactersList extends LitElement {
  static properties = { 
    query: { type: String },
    _characters: { state: true },
    _loading: { state: true },
    _error: { state: true }
  };

  static styles = css`
    :host { display: block }
    .results-count {
      color: #666;
      font-size: 0.9em;
      margin-bottom: 1rem;
    }
    .character-list {
      list-style: none;
      padding: 0;
      margin: 0;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .character-item {
      padding: 1.5rem;
      cursor: pointer;
      border-bottom: 1px solid #d8d4d4;
      transition: all 0.2s ease;
      //background: #f9f7f7;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .character-item:hover {
      background: #f1efef;
    }
    .character-item img {
      width: 3.5rem;
      height: 3.5rem;
      flex-shrink: 0;
      filter: invert(1) brightness(50%) invert(1);
    }
    .character-info {
      flex: 1;
    }
    .name {
      font-weight: 600;
      font-size: 1.1em;
      color: #333;
    }

    .birthdate {
        font-size: 0.9em;
        font-weight: 500;
        color: #ff8c00;
    }
    .description {
      font-size: 0.9em;
      color: #888;
      line-height: 1.4;
    }
    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
    .error {
      color: #e74c3c;
      padding: 1rem;
      text-align: center;
    }
  `;

  constructor() {
    super();
    this.query = '';
    this._characters = [];
    this._loading = false;
    this._error = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('query')) {
      this._searchCharacters();
    }
  }

  async _searchCharacters() {
    try {
      this._loading = true;
      this._error = null;
      const results = await ApiService.searchCharacters(this.query);
      if (!Array.isArray(results)) throw new Error('Invalid response format');
      this._characters = results;
      this._error = null;
    } catch (err) {
      console.error('Search error:', err);
      this._error = 'Error searching characters. Please try again.';
      this._characters = [];
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (this._loading) {
      return html`<div class="loading">Searching characters...</div>`;
    }

    if (this._error) {
      return html`<div class="error">${this._error}</div>`;
    }

    // Show list of all characters if no search query provided, commented empty state
    /*if (!this.query.trim()) {
      return html`
        <div class="empty-state">
          <p>Enter a search term to find characters</p>
        </div>
      `;
    }*/

    if (!this._characters.length) {
      return html`
        <div class="empty-state">
          <p>No characters found for "${this.query}"</p>
        </div>
      `;
    }

    return html`
      <div>
        <ul class="character-list">
          ${this._characters.map(char => html`
            <li @click=${() => this._select(char.id)} class="character-item">
                <img src="./src/assets/${char.side === 'dark' ? 'dark' : 'light'}.png" alt="${char.side} side" />
                <div class="character-info">
                  <div class="name">${char.name} ${char.legends ? '(Legends)' : ''}</div>
                <span class="birthdate">${char.birthdate}</span>
                  <div class="description">${char.description}</div>
                </div>
            </li>
          `)}
        </ul>
      </div>
    `;
  }

  _select(id) {
    this.dispatchEvent(new CustomEvent('select-character', { detail: { id }, bubbles: true, composed: true }));
  }
}

customElements.define('characters-list', CharactersList);
