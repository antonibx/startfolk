# 🌟 StarFolk

A beautiful Star Wars character wiki built with modern web technologies. Explore and discover characters from a galaxy far, far away.

## ✨ Features

- **Character Search**: Quickly find characters by name or role
- **Character Profiles**: Detailed information about each character including:
  - Full description and backstory
  - Character metadata (gender, homeworld, species, role, etc.)
  - Character portrait (light side or dark side themed)
  - Film appearances
- **Featured Characters**: Quick access sidebar to browse featured characters
- **Responsive Design**: Beautiful UI with custom fonts and thoughtful styling
- **Hash-based Routing**: Client-side navigation without page reloads

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14+) - for frontend build tools
- **Python** (v3.8+) - for the API server

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd startfolk
   ```

2. **Install Node.js dependencies** (for frontend tooling)
   ```bash
   npm install
   ```

3. **Install Python dependencies** (for the API)
   ```bash
   python -m pip install -r requirements.txt
   ```

### Running the Application

#### Option 1: Run Everything Together (Recommended)
```bash
npm run dev
```
This starts both the frontend and API server in parallel:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000

#### Option 2: Run Separately

Start the frontend:
```bash
npm run start
```
Frontend will be available at http://localhost:3000

In another terminal, start the API:
```bash
npm run start:api
```
API will be available at http://localhost:4000

## 📁 Project Structure

```
startfolk/
├── index.html                # Main HTML entry point
├── api/
│   ├── server.py             # Flask API server (Python)
│   └── data/characters.json  # Character database
├── src/
│   ├── app.js                # Root component & router
│   ├── services/api.js       # API service wrapper
│   ├── components/           # Lit web components
│   │   ├── search-bar.js
│   │   ├── characters-list.js
│   │   ├── characters-profile.js
│   │   ├── featured-characters.js
│   │   ├── home-page.js
│   │   └── about-page.js
│   ├── assets/				  # Starfighter background
│   └── styles/				  # Global styles & Font definitions
├── package.json              # Node.js dependencies & scripts
└── requirements.txt          # Python dependencies
```

## 🛠️ Tech Stack

**Frontend:**
- [Lit](https://lit.dev/) 2.7.5 - Lightweight web components framework
- Vanilla JavaScript (ES6+)
- CSS3 with custom properties

**Backend:**
- [Flask](https://flask.palletsprojects.com/) - Python web framework
- Flask-CORS - Cross-Origin Resource Sharing support

**Build & Dev Tools:**
- lite-server - Local development server with live reload
- concurrently - Run multiple npm scripts in parallel

## 🌐 API Endpoints

The API server (running on port 4000) provides the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/characters?search=query` | Search characters by name or role |
| GET | `/api/characters/:id` | Get a specific character by ID |
| GET | `/api/featured` | Get all featured characters |
| POST | `/api/__reload` | Reload character data from file (dev only) |

**Example requests:**
```bash
# Search for characters
curl http://localhost:4000/api/characters?search=luke

# Get a specific character
curl http://localhost:4000/api/characters/1

# Get featured characters
curl http://localhost:4000/api/featured
```

## 🎨 Design Highlights

- **Color Palette**: Warm beige (#f9f7f7) with orange accents (#ff8c00)
- **Typography**: Custom Inter font for a modern, clean look
- **Background**: Subtle starfighter pattern with soft filters
- **Layout**: Two-column profile design with character portrait and metadata

## 🔀 Navigation

The app uses hash-based routing:

| Route | Page |
|-------|------|
| `#/` | Home page |
| `#/search` | Search results |
| `#/profile/:id` | Character profile |
| `#/about` | About page |

## 🐛 Troubleshooting

**"pip is not recognized"**
- Use `python -m pip install -r requirements.txt` instead of `pip install`

**"Port 4000 is already in use"**
- Stop any other processes using port 4000, or set `API_PORT` environment variable:
  ```bash
  set API_PORT=5000
  npm run start:api
  ```

**"lite-server not found"**
- Run `npm install` to ensure all Node dependencies are installed

**CORS errors in browser console**
- Make sure the API server is running (`npm run start:api`)
- Verify the API URL in `src/services/api.js` matches your API server port

## 📝 Development Notes

- The frontend uses **light DOM rendering** for simpler global styling
- Character data is stored in `api/data/characters.json` and can be extended with new characters
- Featured characters are marked with `"featured": true` in the data file
- The API automatically reloads data on each request (no need to restart)

## 📄 License

This project is open source. Feel free to fork and modify for your own use.

---

**Made with ❤️ by the Antoni Blanché**