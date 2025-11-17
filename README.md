# My Material Tab

A modern, customizable, and "Material You" inspired New Tab page for Google Chrome. Built with React, Vite, and GSAP, this extension brings the dynamic color system and fluid animations of Android 14 to your desktop browser.

## Features

* **Material You Theming:** Dynamic color extraction from wallpapers and theme switching (Light/Dark mode).
* **Expressive Animations:** Smooth entrance and interaction animations powered by GSAP.
* **Smart Greeting:** Time-aware greetings that change throughout the day.
* **Google Integration:**
    * **Profile Panel:** Displays your real Google account avatar, name, and email via OAuth2.
    * **Apps Launcher:** Quick access to standard Google Apps (Gmail, Drive, YouTube, etc.).
    * **Search:** Functional Google search bar with auto-complete suggestions.
* **Custom Shortcuts:** Add your favorite websites. The extension automatically fetches high-quality favicons for them.
* **Clock:** Digital clock with animated indicators.

## Technologies Used

* **React** (Vite)
* **GSAP** (GreenSock Animation Platform)
* **@material/material-color-utilities** (Google's official color engine)
* **React Icons**
* **Chrome Extension APIs** (Identity, Storage)

## Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* Google Chrome browser

## Installation & Setup

### 1. Install Dependencies
Navigate to the project directory and install the necessary packages.

npm install

### 2. Build the Project
Compile the React application into a production-ready Chrome Extension.

npm run build

This will create a `dist` folder in your project directory.

### 3. Load into Chrome
1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable **Developer mode** in the top right corner.
3.  Click **Load unpacked**.
4.  Select the `dist` folder generated in the previous step.

**Important:** Copy the **ID** of the extension (a long string of letters like `abcdef...`) from this page. You will need it for the Google OAuth setup.

## Google OAuth Configuration

To make the Profile Panel work (displaying name and avatar) and to fetch favicons securely, you must configure a Google Cloud Project.

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Create a New Project** (e.g., "Material New Tab").
3.  **Enable APIs:**
    * Go to "APIs & Services" > "Library".
    * Search for **"Google People API"** and enable it.
4.  **Configure Consent Screen:**
    * Go to "APIs & Services" > "OAuth consent screen".
    * Select **External** and click **Create**.
    * Fill in the **App Name** (e.g., "My Material Tab") and **User Support Email**.
    * Enter your email in **Developer Contact Information**.
    * Click **Save and Continue** (you can skip adding scopes and test users for now).
5.  **Create Credentials:**
    * Go to "APIs & Services" > "Credentials".
    * Click **+ Create Credentials** > **OAuth client ID**.
    * **Application Type:** Select **Chrome app**.
    * **Application ID:** Paste the **Extension ID** you copied from `chrome://extensions`.
    * Click **Create**.
6.  **Update Manifest:**
    * Copy the generated **Client ID**.
    * Open the `manifest.json` file in your source code.
    * Find the `oauth2` section and replace `"YOUR_CLIENT_ID_GOES_HERE"` with your actual Client ID.

    ```json
    "oauth2": {
      "client_id": "YOUR_ACTUAL_GOOGLE_CLIENT_ID",
      "scopes": [
        "[https://www.googleapis.com/auth/userinfo.email](https://www.googleapis.com/auth/userinfo.email)",
        "[https://www.googleapis.com/auth/userinfo.profile](https://www.googleapis.com/auth/userinfo.profile)"
      ]
    }
    ```

### 4. Final Rebuild
After updating `manifest.json`, you must rebuild the project.

npm run build

Go back to `chrome://extensions` and click the **refresh** icon on your extension card to apply the changes.

## License

Distributed under the MIT License.