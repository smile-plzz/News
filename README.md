# Modern News App

This is a modern news application built with React and Vite, fetching news articles from various APIs. It features topic and country filtering, a search functionality, and a responsive UI.

## Features

-   **Neumorphic Minimalist Design:** A modern, clean user interface with soft, extruded elements and adaptive design principles for a seamless experience across devices.

-   **Dynamic News Content:** Fetches real-time news articles from various news APIs.
-   **Topic Filtering:** Filter news by various categories like General, World, Technology, Sports, etc.
-   **Country Filtering:** Filter news by country (US, UK, Canada, Australia, India).
-   **Search Functionality:** Search for news articles using keywords.

-   **Responsive Design:** Adapts to different screen sizes for a seamless user experience.
-   **Loading Indicator:** Provides visual feedback while news articles are being loaded.
-   **Robust Error Handling:** Provides clear error messages for API failures, including missing API keys, rate limits, and authentication issues. Old data is cleared on API errors.

## Technologies Used

-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [GNews API](https://gnews.io/)
-   [TheNewsAPI](https://thenewsapi.com/)
-   [NewsAPI](https://newsapi.org/)
-   [Bootstrap](https://getbootstrap.com/)
-   [Recharts](https://recharts.org/)
-   [GitHub Pages](https://pages.github.com/)

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

### Vercel Deployment

This application can also be deployed to Vercel. Ensure you have the Vercel CLI installed and are logged in.

1.  **Install Vercel CLI (if not already installed):**
    ```bash
    npm install -g vercel
    ```
2.  **Deploy to Vercel:**
    ```bash
    vercel
    ```

**Important: Environment Variables for Vercel Deployment**

For the application to fetch news data correctly, you must configure the following environment variables in your Vercel project settings (e.g., via the Vercel dashboard under Project Settings -> Environment Variables):

-   `VITE_GNEWS_TOKEN`
-   `VITE_NEWSAPI_KEY`
-   `VITE_THENEWSAPI_TOKEN`

## Project Structure

```
News/
├── public/
├── src/
│   ├── assets/
│   ├── components/             # Reusable UI components
│   │   ├── Article.jsx
│   │   ├── BackToTopButton.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Filters.jsx
│   │   ├── MainContent.jsx
│   │   ├── Navbar.jsx
│   │   ├── NewsList.jsx
│   │   └── Spinner.jsx
│   ├── context/                # React Context for global state management
│   │   ├── AppContext.js
│   │   └── AppProvider.jsx
│   ├── hooks/                  # Custom React Hooks for reusable logic
│   │   ├── useLocalStorage.js
│   │   ├── useNews.js
│   │   └── useScroll.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── api/                        # Serverless functions (e.g., for API proxying)
│   └── get-news.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── vercel.json
└── DEVELOPMENT_LOG.md
```

## Development Log

Refer to `DEVELOPMENT_LOG.md` for a detailed history of changes and development decisions.