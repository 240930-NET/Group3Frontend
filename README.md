# Notes for working in frontend:

Project Overview

    Stack: This project uses React for the frontend, Vite for bundling, and Axios for HTTP requests.
    Auth Flow: Authentication is managed with JWT tokens, which are stored in localStorage upon login and set as an Authorization header in Axios requests.

Folder Structure

    API:
        Location: src/api/api.jsx
        Purpose: Contains API utility functions for HTTP requests, apiClient instance with the baseURL, and token management functions (setAuthToken, loginUser, logoutUser).**
        **Key Consideration: All HTTP requests should use apiClient for consistent token handling and baseURL.

    Pages:
        Purpose: Contains each page component (e.g., LoginPage, UserPage).
        Note: Follow existing page component patterns to keep functionality and error handling consistent.

    Components:
        Purpose: Reusable components such as the navigation bar (NavBar).
        Note: May need button and form component for consistency in styling.

    CSS:
        Location: Each page/component has an associated .css file in the same directory (e.g., LoginPage.css).
        Note: Keep styling specific to the component/page to avoid global style conflicts.

Key Files and Their Functions

    api.jsx:
        Contains API calls (registerUser, loginUser, etc.), a configured Axios instance (apiClient), and token management functions.
        Usage: Use apiClient for all Axios requests to automatically include Authorization headers if a token is present.

    App.js:
        Contains routing logic, including ProtectedRoute for securing authenticated routes.
        Usage: Add any new routes here and use ProtectedRoute for routes requiring authentication.

    UserPage.js:
        Fetches and displays user profile information using the /user/profile endpoint.
        Usage: Use fetchUserProfile inside useEffect for any required profile data on page load.

Authentication and Token Management

    Token Storage: JWT tokens are stored in localStorage under the key token.
    Setting Authorization Header: The setAuthToken function in api.jsx sets or removes the Authorization header globally.
    Login Flow:
        On successful login, loginUser stores the token and sets the header.
        Redirects: LoginPage redirects to /user upon successful login.
    Protected Routes:
        Use ProtectedRoute to ensure only authenticated users can access certain routes.

Development Tips

    Running the Project:
        Use npm run dev to start the frontend development server.
    API URL:
        The API base URL is set in api.jsx for localhost; update this for production or staging environments as needed.
    Error Handling:
        Console log all errors for debugging, and provide user-friendly error messages for display.
    Component Structure:
        Keep pages and components focused and separated. Move reusable logic or UI elements into Components.
