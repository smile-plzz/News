# Development Log

## July 14, 2025

### UI/UX Enhancements and Search Functionality

-   **Objective:** Improve the user interface and experience, and add search capabilities.
-   **Changes Made:**
    -   Integrated a Bootstrap Navbar for better navigation.
    -   Added a search input field to allow users to search for news articles by keywords.
    -   Implemented a loading indicator (spinner) to provide feedback while news articles are being fetched.
    -   Enhanced news card layout:
        -   Ensured consistent image sizing with `objectFit: 'cover'`.
        -   Added a placeholder image for articles without an image.
        -   Made card bodies flexible to ensure consistent button alignment.
        -   Added a placeholder description if none is available.
    -   Modified the `fetchNews` function in `App.jsx` to:
        -   Handle `searchTerm` for news searches (using GNews `/search` endpoint).
        -   Set and unset the `loading` state.
        -   Include basic error handling for API calls.
-   **Next Steps:** Update `README.md` and then commit and push changes.

## July 14, 2025

### Phase 1 Completion: UI/UX and Search Implemented

-   **Objective:** Confirm successful implementation and deployment of Phase 1 features.
-   **Status:** Completed and deployed to GitHub Pages.
-   **Next Steps:** Proceed with Phase 2: Advanced Filtering (Date Filtering) and Error Handling refinements.

### Date Filtering Implementation

-   **Objective:** Add functionality to filter news articles by a specific date range.
-   **Changes Made:**
    -   Introduced `fromDate` and `toDate` states in `App.jsx` to manage the date range.
    -   Added two new input fields (`type="date"`) to the UI for users to select the start and end dates.
    -   Modified the `fetchNews` function to include `from` and `to` parameters in the GNews API request when `fromDate` or `toDate` are set. Dates are formatted as `YYYY-MM-DDThh:mm:ssZ` as required by the API.
-   **Next Steps:** Commit and push changes, then consider further error handling and pagination.

### Error Handling and Pagination Implementation

-   **Objective:** Improve error feedback to the user and implement basic pagination.
-   **Changes Made:**
    -   Introduced an `error` state in `App.jsx` to store and display API error messages.
    -   Implemented `page` and `totalResults` states to manage pagination.
    -   Modified the `fetchNews` function to:
        -   Reset `articles`, `page`, and `totalResults` when filters (`topic`, `country`, `searchTerm`, `fromDate`, `toDate`) change.
        -   Include the `page` parameter in the GNews API request.
        -   Append new articles to the `articles` array when `loadMore` is true (for the "Load More" functionality).
        -   Set the `totalResults` from the API response.
        -   Catch and display API errors using a Bootstrap alert.
    -   Added a "Load More" button that appears when there are more articles to fetch, allowing users to load more content.
-   **Next Steps:** Commit and push changes. Consider further UI/UX refinements or additional features as requested.

### Dark Mode Implementation

-   **Objective:** Provide a dark mode option for improved user experience.
-   **Changes Made:**
    -   Introduced a `darkMode` state in `App.jsx` to control the theme.
    -   Added a toggle switch (checkbox) in the navigation bar to allow users to switch between light and dark modes.
    -   Used a `useEffect` hook to add or remove a `dark-mode` class to the `body` element based on the `darkMode` state.
    -   Modified `App.css` and `index.css` to include styles for the `dark-mode` class, adjusting background colors, text colors, and component-specific styles (cards, forms, buttons, navbar).
-   **Next Steps:** Commit and push changes. Consider further responsiveness improvements or other features.

### Responsiveness Improvements

-   **Objective:** Enhance the application's layout and usability on smaller screens.
-   **Changes Made:**
    -   Added media queries to `App.css` to adjust the layout for screens smaller than 768px (typical mobile devices).
    -   Modified the navigation bar to stack items vertically on small screens.
    -   Adjusted the search input and dark mode toggle for better display on mobile.
    -   Ensured filter dropdowns and date inputs occupy full width on small screens.
    -   Updated card column behavior to display one card per row on mobile for better readability.
-   **Next Steps:** Commit and push changes. Consider adding a "Back to Top" button or other minor UI/UX refinements.

### Phase 2 Completion: Advanced Filtering and UI/UX Refinements Implemented

-   **Objective:** Confirm successful implementation and deployment of Phase 2 features.
-   **Status:** Completed and deployed to GitHub Pages.
-   **Next Steps:** Proceed with further refinements or new features as requested.

### "Back to Top" Button Implementation

-   **Objective:** Improve user navigation on long pages by adding a "Back to Top" button.
-   **Changes Made:**
    -   Introduced `showBackToTop` state in `App.jsx` to control the visibility of the button.
    -   Added `handleScroll` function to detect scroll position and update `showBackToTop`.
    -   Implemented `scrollToTop` function to smoothly scroll the page to the top.
    -   Added an event listener for scroll events to `window`.
    -   Included the "Back to Top" button in `App.jsx` conditionally rendered based on `showBackToTop`.
    -   Added basic styling for the button in `App.css` to position it fixed at the bottom right of the screen.
-   **Next Steps:** Commit and push changes. Proceed with adding more filtering options (source, language, sort order).

### Language Filtering Implementation

-   **Objective:** Allow users to filter news articles by language.
-   **Changes Made:**
    -   Introduced a `language` state in `App.jsx` to manage the selected language (defaulting to 'en').
    -   Added a new dropdown (`select`) input for language selection in the UI, offering common languages like English, Spanish, French, German, Italian, Portuguese, Russian, and Chinese.
    -   Modified the `fetchNews` function to include the `lang` parameter in both `/top-headlines` and `/search` GNews API requests.
    -   Updated the `useEffect` dependency array for `fetchNews` to include `language`.
-   **Next Steps:** Commit and push changes. Proceed with implementing user preferences (saving/loading settings) and the "Share" feature.

### Back to Top Button Implemented

-   **Objective:** Improve user navigation on long pages.
-   **Status:** Completed.
-   **Next Steps:** Proceed with implementing user preferences (saving/loading settings) and the "Share" feature.