# Social Media API

A RESTful API for a social media platform built with Node.js, Express, MongoDB, and Socket.IO.

## Features

- User authentication using JWT
- Post creation and management
- Comment system
- Real-time chat and notifications using Socket.IO
- Pagination for posts
- MongoDB database integration

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-media-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   CLIENT_URL=http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user

### Posts
- POST /api/posts - Create a new post (requires authentication)
- GET /api/posts - Get all posts (supports pagination)

### Comments
- POST /api/comments - Create a new comment (requires authentication)

## WebSocket Events

- 'connection' - When a user connects
- 'chatMessage' - Send a chat message
- 'message' - Receive a chat message
- 'newPost' - New post notification
- 'newComment' - New comment notification

## Error Handling

The API implements proper error handling for:
- Invalid requests
- Authentication errors
- Database errors
- Validation errors