import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';
import { ApiService } from '../services/api.js';

class CharactersProfile extends LitElement {
  static properties = { 
    characterId: { type: Number },
    _character: { state: true },
    _loading: { state: true },
    _error: { state: true }
  };

  static styles = css`
    :host { display: block }
    .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px }
    .back { 
      background: rgba(255, 255, 255, 0.9); 
      border: 1px solid #ddd; 
      padding: 8px 16px; 
      border-radius: 8px; 
      cursor: pointer;
      font-family: var(--app-font, inherit);
      transition: all 0.2s ease;
    }
    .back:hover {
      background: #fff;
      border-color: #bbb;
    }
    .card { 
      padding: 24px; 
      background: rgba(255, 255, 255, 0.95); 
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .loading { text-align: center; padding: 2rem; color: #666 }
    .error { color: #e74c3c; padding: 1rem; text-align: center }
    /* Two-column layout: main (left) and aside (right) */
    .profile-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
      align-items: start;
    }
    .profile-main {
      min-width: 0;
    }
    .profile-aside {
      min-width: 0;
    }
    .meta-card {
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.04);
    }
    .label { font-weight: 600; color: #666; margin-bottom: 4px }
    .value { 
      color: #333;
      font-weight: 500;
    }
    .film-item {
      margin-left: .3rem;
    }
    .profile-aside .portrait {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 12px;
      background: #f5f5f5;
      display: block;
      filter: invert(1) brightness(70%) invert(1);
    }
    .meta-table { width: 100%; border-collapse: collapse; }
    .meta-table tr { display: block; margin-bottom: 12px; padding-bottom: 12px;  }
    .meta-table tr:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .meta-table td { display: block; padding: 0; }
    .meta-table td.label { color: #999; font-weight: 600; font-size: 0.85em; margin-bottom: 4px; border-bottom: 1px solid #eee;}
    .meta-table td.value { color: #333; font-weight: 500; word-break: break-word; }
    @media (max-width: 800px) {
      .profile-layout { grid-template-columns: 1fr; }
    }
  `;

  constructor() {
    super();
    this.characterId = null;
    this._character = null;
    this._loading = false;
    this._error = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('characterId') && this.characterId) {
      this._loadCharacter();
    }
  }

  async _loadCharacter() {
    if (!this.characterId) return;

    try {
      this._loading = true;
      this._error = null;
      this._character = await ApiService.getCharacter(this.characterId);
    } catch (err) {
      this._error = 'Error al cargar el perfil. Por favor, inténtalo de nuevo.';
      this._character = null;
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (this._loading) {
      return html`<div class="loading">Cargando perfil...</div>`;
    }

    if (this._error || !this._character) {
      return html`
        <div>
          <button class="back" @click=${this._back}>Volver</button>
          <p class="error">
            ${this._error || `Perfil no encontrado (id: ${this.characterId})`}
          </p>
        </div>
      `;
    }

    // Cleanup line jumps '\n'
    const lead = (this._character.lead || '').split('\n').filter(Boolean);
    const details = (this._character.details || '').split('\n').filter(Boolean);

    return html`
      <div>
        <div class="profile-layout">
          <div class="profile-main">
            <div>
              <h2>${this._character.name}</h2>
              ${lead.length ? html`<div>${lead.map(line => html`<p>${line}</p>`)}</div>` : null}
              <h3>Core Traits</h3>
              ${this._character.traits.length ? html`<ul>${this._character.traits.map(line => html`<li>${line}</li>`)}</ul>` : null}
              <h3>Key Moments in ${this._character.gender == 'male' ? 'His' : 'Her'} Journey</h3>
              ${this._character.moments.length ? html`<ul>${this._character.moments.map(line => html`<li>${line}</li>`)}</ul>` : null}
              <h3>Important Relationships</h3>
              ${this._character.relationships.length ? html`<ul>${this._character.relationships.map(line => html`<li>${line}</li>`)}</ul>` : null}
              ${details.length ? html`<div>${details.map(line => html`<p>${line}</p>`)}</div>` : null}
            </div>
          </div>

          <aside class="profile-aside">
            <div class="meta-card">
              <img class="portrait" src=${this._character.side === 'dark' ? '/src/assets/dark.png' : '/src/assets/light.png'} alt="${this._character.side} portrait">
              <table class="meta-table">
                <tbody>
                  <tr><td class="label">Name</td><td class="value">${this._character.name}</td></tr>
                  <tr><td class="label">Gender</td><td class="value">${this._character.gender}</td></tr>
                  <tr><td class="label">Homeworld</td><td class="value">${this._character.homeworldName || 'Unknown'}</td></tr>
                  <tr><td class="label">Birth Year</td><td class="value">${this._character.birthYear || 'Unknown'}</td></tr>
                  <tr><td class="label">Species</td><td class="value">${this._character.speciesName || 'Unknown'}</td></tr>
                  <tr><td class="label">Role</td><td class="value">${this._character.role || 'Unknown'}</td></tr>
                  <tr><td class="label">Films</td><td class="value">
                    <ul style="margin: 0; padding-left: 16px;">${(this._character.films || []).map(film => html`<li class="film-item">${film}</li>`)}</ul>
                  </td></tr>
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  _back() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }
}

customElements.define('characters-profile', CharactersProfile);
