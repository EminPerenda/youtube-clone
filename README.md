# YouTube Clone

A responsive YouTube front-end clone built with React and the YouTube Data API v3. It replicates the core browsing experience of YouTube — a category-filtered home feed, a video watch page with recommendations, a collapsible sidebar, and a profile page — all powered by live data from Google's API.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Home feed** — Browse trending videos filtered by category (Music, Gaming, News, Sports, etc.)
- **Video player page** — Watch a selected video alongside its details and a list of recommended videos from the same category
- **Collapsible sidebar** — Toggle navigation for a focused viewing experience
- **Profile page & dropdown menu** — Basic user profile view accessible from the navbar
- **View count & upload time formatting** — Large numbers are abbreviated (e.g. `1.2M views`) and timestamps are shown as relative time (e.g. `3 days ago`) via `moment.js`
- **Client-side routing** — Seamless navigation between pages using React Router
- **Responsive layout** — Adapts to different screen sizes

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 8](https://vite.dev/) |
| Routing | [React Router DOM 7](https://reactrouter.com/) |
| Date formatting | [Moment.js](https://momentjs.com/) |
| Linting | [Oxlint](https://oxc.rs/) |
| Data source | [YouTube Data API v3](https://developers.google.com/youtube/v3) |

## Project Structure

```
youtube-clone/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Images, icons, and sample media
│   ├── Components/
│   │   ├── Navbar/          # Top navigation bar with search and profile menu
│   │   ├── Sidebar/         # Collapsible category navigation
│   │   ├── Feed/            # Home page video grid
│   │   ├── PlayVideo/       # Video player and details panel
│   │   ├── Recommended/     # Related videos list
│   │   └── ProfileDropdown/ # Account dropdown menu
│   ├── Pages/
│   │   ├── Home/            # Landing page (sidebar + feed)
│   │   ├── Video/           # Watch page (player + recommendations)
│   │   └── Profile/         # User profile page
│   ├── data.js               # API key, base URL, and helper functions
│   ├── App.jsx                # Route definitions
│   └── main.jsx                # Application entry point
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com) key from Google Cloud Console

### Installation

```bash
git clone <your-repository-url>
cd youtube-clone
npm install
```

### Configure your API key

This project calls the YouTube Data API through a local dev proxy (configured in `vite.config.js`) to avoid CORS issues:

```js
server: {
  proxy: {
    "/yt": {
      target: "https://www.googleapis.com/youtube/v3",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/yt/, ""),
    },
  },
},
```

Set your own API key in `src/data.js`:

```js
export const API_KEY = "YOUR_YOUTUBE_API_KEY";
export const API_BASE = "/yt";
```

> **Security note:** Never commit a real API key to version control. Move `API_KEY` into an environment variable (e.g. a `.env` file read via `import.meta.env.VITE_YOUTUBE_API_KEY`) and add `.env` to `.gitignore` before publishing this repository or deploying it publicly.

### Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

> **Note:** The production build served via `npm run preview` (or any static host) will not have Vite's dev proxy available, so `/yt` requests will fail unless you configure an equivalent proxy or rewrite `API_BASE` to call the YouTube API directly (with appropriate CORS/key restrictions) in production.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot module reloading |
| `npm run build` | Build an optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint against the codebase |

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Trending videos filtered by category |
| `/video/:categoryId/:videoId` | Video | Video player with details and recommendations |
| `/profile` | Profile | User profile page |

## Roadmap

- [ ] Move API key to environment variables
- [ ] Add search results page
- [ ] Add authentication and real user profiles
- [ ] Add comments section on the video page
- [ ] Add loading and error states for API requests

## License

This project is intended for educational purposes. Add a license of your choice (e.g. MIT) if you plan to distribute it.

## Acknowledgements

- [YouTube Data API v3](https://developers.google.com/youtube/v3) for video data
- Original clone concept inspired by common React/YouTube-clone tutorials
