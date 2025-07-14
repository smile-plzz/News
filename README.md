# Modern News App

This is a modern news application built with React and Vite, fetching news articles from the GNews API. It features topic and country filtering, a search functionality, and a responsive UI.

## Features

-   **Dynamic News Content:** Fetches real-time news articles from the GNews API.
-   **Topic Filtering:** Filter news by various categories like General, World, Technology, Sports, etc.
-   **Country Filtering:** Filter news by country (US, UK, Canada, Australia, India).
-   **Search Functionality:** Search for news articles using keywords.
-   **Trending Keywords:** View a graph of the latest trending keywords.
-   **Responsive Design:** Adapts to different screen sizes for a seamless user experience.
-   **Loading Indicator:** Provides visual feedback while news articles are being loaded.
-   **API Fallback:** Automatically switches to an alternative news API (GNews, TheNewsAPI, NewsAPI) if the primary one fails, ensuring continuous service.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

-   [Node.js](https://nodejs.org/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/smile-plzz/News.git
    cd News
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Development Server

To run the app in development mode:

```bash
npm run dev
```

This will start the development server, and you can view the app in your browser at `http://localhost:5173` (or whatever port is indicated in your terminal).

### Building for Production

To build the app for production:

```bash
npm run build
```

This command bundles the React app into static files in the `dist` directory.

## Deployment

This application is configured for deployment to GitHub Pages.

### GitHub Pages Deployment

To deploy the application to GitHub Pages:

```bash
npm run deploy
```

This script will:
1.  Build the application for production.
2.  Push the contents of the `dist` directory to the `gh-pages` branch of your repository.

The application will then be accessible at `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/` (e.g., `https://smile-plzz.github.io/News/`).

## Project Structure

```
News/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── DEVELOPMENT_LOG.md
```

## Development Log

Refer to `DEVELOPMENT_LOG.md` for a detailed history of changes and development decisions.