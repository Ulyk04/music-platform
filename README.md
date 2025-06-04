# Music Platform

---

Welcome to the **Music Platform**, a full-stack web application designed to deliver a seamless music listening experience. This project features a responsive user interface built with React and Material-UI, alongside a robust Node.js backend handling all the music data and operations. Enjoy your favorite tunes, manage playlists, and switch between light and dark themes for personalized Browse.

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Live Demo](#live-demo)
* [Screenshots](#screenshots)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
* [Project Structure](#project-structure)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

## Features

* **Responsive Design:** Optimized for various screen sizes, ensuring a great experience on desktops, tablets, and mobile devices.
* **Real-time Music Playback:** Play music directly within the application.
* **Theme Switching:** Easily toggle between **light and dark themes** to suit your preference.
* **Navigation Segments:**
    * **Home:** Discover new music and featured tracks.
    * **Library:** Browse your collection of songs.
    * **My Playlists:** Access and manage your custom playlists.
    * **Create Playlist:** Easily create new personalized playlists.

## Technologies Used

---

### Client-side (Frontend)

* **React:** A JavaScript library for building user interfaces.
* **Material-UI (MUI):** A comprehensive suite of UI tools for a sleek and modern design.

### Server-side (Backend)

* **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **CORS:** Middleware to enable Cross-Origin Resource Sharing.
* **Body-parser:** Node.js body parsing middleware.
* **Axios:** Promise based HTTP client for the browser and node.js.

## Live Demo

---

Experience the **Music Platform** live:

🔗 [**Visit the Live Demo**](https://music-platform-frontend.onrender.com)

*(Please note: The free tier backend service on Render may experience a slight delay on the first load due as it wakes up from inactivity.)*

## Screenshots

---

*(Replace these placeholders with actual images of your project)*

| Home Page (Light Theme) | Home Page (Dark Theme) |
| :---------------------- | :--------------------- |
| ![Screenshot of Home Page Light Theme](https://raw.githubusercontent.com/Ulyk04/music-platform/main/home-light.jpeg) | ![Screenshot of Home Page Dark Theme]([images/home-dark.png](https://raw.githubusercontent.com/Ulyk04/music-platform/main/home-dark.jpeg) |

| Library Page | Create Playlist Page |
| :----------- | :------------------- |
| ![Screenshot of Library Page](https://raw.githubusercontent.com/Ulyk04/music-platform/main/library.jpeg) | ![Screenshot of Create Playlist Page](https://raw.githubusercontent.com/Ulyk04/music-platform/main/playlist.jpeg) |

| Mobile View | Music Player |
| :---------- | :----------- |
| ![Screenshot of Mobile View](https://raw.githubusercontent.com/Ulyk04/music-platform/main/mobile.jpeg) | ![Screenshot of Music Player](https://raw.githubusercontent.com/Ulyk04/music-platform/main/create.jpeg) |

*(Create an `images` folder in your repository root and place your screenshots there. Update the paths accordingly.)*

## Getting Started

---

To set up the project locally for development, follow these steps.

### Prerequisites

Make sure you have the following installed:

* Node.js (LTS version recommended)
* npm or Yarn

### Backend Setup

1.  Navigate to the `server-side` directory:
    ```bash
    cd server-side
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or yarn install
    ```
3.  Create a `.env` file in the `server-side` directory and add your environment variables (e.g., database connection string, port, etc.).
    ```
    # Example .env content
    PORT=5000
    DATABASE_URL=your_database_connection_string
    ```
4.  Start the backend server:
    ```bash
    npm start
    # or node server.js (if your start script is not defined)
    ```
    The server will typically run on `http://localhost:5000` (or the port specified in your `.env` file).

### Frontend Setup

1.  Navigate to the `client-side` directory:
    ```bash
    cd client-side
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or yarn install
    ```
3.  Create a `.env` file in the `client-side` directory and add your environment variables. Ensure you point to your backend server.
    ```
    # Example .env content for React
    REACT_APP_API_URL=http://localhost:5000
    ```
    *(Adjust `REACT_APP_API_URL` based on your frontend framework's convention if it's not React, e.g., `VITE_APP_API_URL` for Vite, `VUE_APP_API_URL` for Vue CLI, etc.)*
4.  Start the frontend development server:
    ```bash
    npm start
    # or yarn start
    ```
    The client application will typically open in your browser at `http://localhost:3000`.

## Project Structure

---

The repository is organized into two main directories:

``` bash
music-platform/
├── client-side/   # Contains the React frontend application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
└── server-side/   # Contains the Node.js Express backend application
├── src/
├── package.json
└── ...
```

## Deployment

---

This project is deployed on **Render**, leveraging its free tier for both the static frontend and the web service backend.

* **Frontend (Static Site):** Hosted as a Static Site on Render.
* **Backend (Web Service):** Hosted as a Web Service on Render.

For detailed deployment steps on Render, refer to the official Render documentation or the deployment guide in your project notes.

## Contributing

---

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

---

This project is open source and available under the [MIT License](LICENSE). *(If you have a different license, update this accordingly, or create a `LICENSE` file if you haven't already).*
