import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

class AboutPage extends LitElement {
  static styles = css`
    :host { display: block }
    .wrap { padding: 1rem }
    h1 { font-size: 2rem; color: #333; margin-bottom: 1rem }
  `;

  render() {
    return html`
      <div class="wrap">
        <h1>About us</h1>
        <p>This is a placeholder introduction for the About page.</p>
      </div>
    `;
  }
}

customElements.define('about-page', AboutPage);
