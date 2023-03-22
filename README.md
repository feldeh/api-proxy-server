# API Proxy Server

This is a lightweight Node.js server that provides a secure way to proxy requests to external APIs. The server is designed to be used as an intermediary between client-side applications and external APIs, allowing for secure management of API keys.

## Features

-   Secure proxying of requests to external APIs
-   Caching of responses to improve performance and reduce API usage limits
-   Rate limiting to prevent abuse and protect API usage limits
-   CORS whitelisting to control which domains can access the API

## Getting Started

To get started, follow these steps:

1.  Clone this repository to your local machine.
2.  Install the required dependencies by running `npm install` in the project directory.
3.  Start the server by running `npm start` in the project directory.

## Routes

This server has a single route `/api`. You can add more routes by creating new files in the `./routes` directory and requiring them in the `server.js` file.
