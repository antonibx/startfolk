import './components/search-bar.js';
import './components/characters-list.js';
import './components/characters-profile.js';
import './components/featured-characters.js';
import './components/home-page.js';
import './components/about-page.js';
import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

class AppRoot extends LitElement {
  static properties = {
    view: { type: String },
    query: { type: String },
    selectedId: { type: Number },
    loading: { type: Boolean },
    error: { type: String }
  };
  // Render into light DOM so global CSS (src/styles/app.css) can style the content.
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.view = 'home';
    this.query = '';
    this.selectedId = null;
    this.loading = false;
    this.error = null;
    this._onRouteChange = this._onRouteChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this._onRouteChange);
    this._onRouteChange();
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this._onRouteChange);
    super.disconnectedCallback();
  }

  _onRouteChange() {
    const route = location.hash || '#/';
    
    if (route === '#/') {
      this.view = 'home';
      this.selectedId = null;
    } else if (route === '#/about') {
      this.view = 'about';
      this.selectedId = null;
    } else {
      const profileMatch = route.match(/^#\/profile\/(\d+)/);
      if (profileMatch) {
        this.view = 'profile';
        this.selectedId = Number(profileMatch[1]);
      } else if (route === '#/search') {
        this.view = 'list';
        this.selectedId = null;
      } else {
        // Unknown route, go back to home
        location.hash = '#/';
      }
    }
    
    this.requestUpdate();
  }

  onSearch(event) {
    this.query = event.detail.query;
    if (this.query.trim()) {
      location.hash = '#/search';
    }
  }

  onSelectCharacter(event) {
    const id = event.detail.id;
    location.hash = `#/profile/${id}`;
  }

  onBack() {
    location.hash = '#/';
  }

  render() {
    return html`
      <div class="app">
        <header>
          <a href="#/" class="logo-wrap">
            <span class="logo">
                <img src="./src/assets/logo.png" alt="StartFolk Logo">
                <span>Star<b>Folk</b></span>
                |
            </span>
            <span class="lead">
                <span>All the characters.</span>
                <span>One galaxy</span>
            </span>
          </a>
          <div class="search-wrap">
            <search-bar @search=${this.onSearch}></search-bar>
          </div>
        </header>
        <div class="content">
          <featured-characters @select-character=${this.onSelectCharacter}></featured-characters>
          <main>
            ${this.view === 'home'
              ? html`<home-page></home-page>`
              : this.view === 'list'
                ? html`<characters-list .query=${this.query} @select-character=${this.onSelectCharacter}></characters-list>`
                : this.view === 'about'
                  ? html`<about-page></about-page>`
                  : html`<characters-profile .characterId=${this.selectedId} @back=${this.onBack}></characters-profile>`}
          </main>
        </div>
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);
