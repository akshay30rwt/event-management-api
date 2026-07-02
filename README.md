# Event Management API

A REST API for managing events built with Node.js, Express.js, MongoDB and JWT authentication.

## Features
- User registration and login
- Create, read, update, delete events
- Public routes for viewing events
- Protected routes for managing events

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /auth/register   - Register a user
- POST   /auth/login      - Login a user
- GET    /events          - Get all events
- GET    /events/:id      - Get an event by ID
- POST   /events          - Create an event (protected)
- PUT    /events/:id      - Update an event (protected)
- DELETE /events/:id      - Delete an event (protected)