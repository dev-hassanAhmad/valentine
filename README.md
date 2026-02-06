
  # Valentine Proposal Website Design

  This is a code bundle for Valentine Proposal Website Design. The original project is available at https://www.figma.com/design/byGC0rPGzlPOOFjX55Bt6c/Valentine-Proposal-Website-Design.

  ## Running the code

  This is a Next.js application.

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server (runs on http://localhost:3000).

  Run `npm run build` to create a production build.

  Run `npm start` to start the production server.

  ## Personalizing the Proposal

  You can personalize the proposal by adding a receiver's name in the URL. The name is encoded for privacy.

  ### Generate a personalized URL

  **Option 1: Web Interface (Hidden Route)**

  Visit the hidden encoder route at `/encode` to use a web-based encoder:

  ```
  http://localhost:5173/encode
  ```

  This provides a user-friendly interface where you can:
  - Enter a name
  - Get the encoded text instantly
  - Copy the full URL with one click
  - See a preview of what the recipient will see

  **Option 2: Command Line Script**

  Use the helper script to generate an encoded URL:

  ```bash
  node generate-url.js "Caron"
  ```

  This will output a URL like:
  ```
  http://localhost:5173?receiver=Q2Fyb24
  ```

  When someone visits this URL, they'll see: **"Caron, will you be my Valentine?"** instead of the generic message.

  ### Manual URL generation

  If you prefer to generate the URL manually, you can use the encoding function in the browser console:

  ```javascript
  // Encode a name
  function encodeName(name) {
    return btoa(encodeURIComponent(name))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  
  encodeName("Caron"); // Returns: "Q2Fyb24"
  ```

  Then add it to your URL: `?receiver=Q2Fyb24`

  ### Notes

  - If no `receiver` parameter is provided or if it's invalid, the default message "Will you be my Valentine?" will be displayed
  - Names are validated to ensure they contain only letters, spaces, hyphens, apostrophes, and periods
  - Maximum name length is 50 characters

  ## Firebase Integration

  The app is integrated with Firebase Realtime Database to log proposal acceptances via a secure API endpoint. When someone accepts a proposal, the following information is saved:

  - Receiver name (if provided)
  - Timestamp
  - Date (ISO format)
  - User agent

  ### API Endpoint

  Proposal acceptances are submitted via a POST request to `/api/proposals`. The API route handles Firebase operations server-side, keeping your Firebase credentials secure.

  **Endpoint:** `POST /api/proposals`

  **Request Body:**
  ```json
  {
    "receiverName": "Caron" // or null
  }
  ```

  ### Firebase Configuration

  Firebase is configured server-side only in `app/api/proposals/route.ts`. The configuration uses:
  - Firebase Realtime Database
  - Data is stored under the `proposals` node
  - Firebase credentials are kept secure on the server

  ### Viewing Data

  You can view the logged proposals in your Firebase Console:
  1. Go to [Firebase Console](https://console.firebase.google.com/)
  2. Select your project: `valentine-f2bda`
  3. Navigate to Realtime Database
  4. View the `proposals` node to see all acceptances

  ### Privacy & Security Note

  - Firebase credentials are server-side only (not exposed to the client)
  - The logging happens silently in the background and doesn't affect the user experience
  - If logging fails, the app continues to work normally
  - All API requests are handled securely through Next.js API routes
  