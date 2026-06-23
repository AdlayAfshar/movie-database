# Movie Database

A React movie and TV discovery app powered by [The Movie Database (TMDB)](https://www.themoviedb.org/). The app lets users search for movies and TV shows, browse trending titles, and filter movie or TV discovery results by sort order and genre.

## Features

- Search TMDB movies and TV shows from a shared landing search form.
- Browse trending media for today or this week.
- Switch trending results between all media, movies, and TV shows.
- View movie discovery results with popularity and rating sort options.
- View TV discovery results with genre filters.
- Filter movie and TV sections by one or more genres.
- View poster art, ratings, titles, and release dates in reusable media cards.

## Tech Stack

- React 19
- Vite
- Sass stylesheets
- Vitest and Testing Library
- TMDB REST API
- GitHub Pages deployment via `gh-pages`

## Project Structure

```text
src/
  Components/     Reusable UI pieces such as search, filters, and media cards
  Layouts/        Page sections such as the header, search landing, and trending
  Pages/          Main page composition plus movie and TV sections
  helper/         Shared fetch helper for TMDB requests
```

## Getting Started

### Prerequisites

- Node.js 22.13 or newer
- npm
- A TMDB API key if you want to replace the currently hardcoded development key

### Install

```bash
npm install
```

### Run Locally

```bash
npm start
```

The app runs at the Vite dev-server URL printed in the terminal, usually [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Test

```bash
npm test
```

This runs the Vitest test suite once.

### CodeSandbox

Import the repository into CodeSandbox and run:

```bash
npm install
npm start
```

The `start` script binds Vite to `0.0.0.0`, which lets CodeSandbox expose the preview URL.

## TMDB API Configuration

TMDB requests are configured in `src/Pages/Main.jsx`:

```js
const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = "ffa300523873658c0dc98283306a3c45";
const requestParams = `?api_key=${apiKey}`;
```

For a production app, move the API key into an environment variable and avoid committing private credentials. With Vite, browser-exposed environment variables must start with `VITE_`.

## Available Scripts

- `npm start` - start the local development server.
- `npm run dev` - start the local development server.
- `npm run build` - create a production build.
- `npm run preview` - preview the production build locally.
- `npm test` - run tests once.
- `npm run deploy` - build the app and publish the `dist/` directory to GitHub Pages.

## Deployment

The project is configured for GitHub Pages with this homepage:

```json
"homepage": "https://AdlayAfshar.github.io/movie-database/"
```

To deploy:

```bash
npm run deploy
```

The deployment script runs a production build and publishes the generated `dist/` folder using `gh-pages`. `vite.config.js` uses `/movie-database/` as the base path for production builds and `/` for development previews.

## Development Notes

- `fetchData` in `src/helper/fetchData.js` wraps `fetch` and returns parsed JSON for successful TMDB responses.
- `ShowMedia` in `src/Components/ShowMedia.jsx` handles shared poster-card rendering for search, trending, movie, and TV results.
- Movie and TV pages share the same filter components, but the sort options currently use movie endpoint values.
- The smoke test in `src/App.test.jsx` mocks TMDB responses so it can run without network access.
