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