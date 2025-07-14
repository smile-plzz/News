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