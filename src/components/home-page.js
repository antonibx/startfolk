import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

class HomePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 0 2rem 0 3rem;
    }

    .welcome {
      margin-bottom: 2rem;
    }
    h1 {
      font-size: 2.2rem;
      color: #333;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }
    .feature {
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      text-align: left;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    .feature h3 {
      color: #333;
      margin: 0 0 0.5rem 0;
      font-weight: 600;
    }
    .feature p {
      font-size: 0.95rem;
      margin: 0;
      color: #666;
    }
    ul {
      text-align: left;
      max-width: 600px;
      margin: 1rem auto;
      color: #555;
    }
    li {
        margin-bottom: 1rem;
    }
  `;

  render() {
    return html`
    <span class="home-content">
      <div class="welcome">
        <h1>Welcome to StarFolk Wiki</h1>
      </div>
      <p>
        Step into a galaxy of heroes, villains, rebels, and rulers. StarFolk Wiki is your guide to the characters who shaped the Star Wars universe - from the legendary Jedi and Sith, to smugglers, droids, and everyone in between.
      </p>
      <p>
        Here you'll find:
      </p>
      <ul>
        <li>Detailed profiles of characters across the saga</li>
        <li>Backgrounds, homeworlds, and key appearances</li>
        <li>Connections between stories, films and series</li>
        <li>Fun facts and trivia that bring the galaxy to life</li>
      </ul>
      <p>
        Whether you're a long-time fan or just beginning your journey, StarFolk Wiki is the one place where every story, big or small, finds its place among the stars.
      </p>
      <p>
        So grab your lightsaber, choose your side, and start exploring!
      </p>
      </div>
    </span>
    `;
  }
}

customElements.define('home-page', HomePage);