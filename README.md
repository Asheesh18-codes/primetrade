PrimeTrade API - REST API with Authentication & Task Management

Overview
PrimeTrade is a full-stack application with a secure REST backend API and a React frontend. It provides user authentication with JWT, role-based access control, and task management functionality.

Features
- User registration and login with bcrypt password hashing
- JWT token-based authentication
- Role-based access control (user and admin roles)
- Task CRUD operations with role-based restrictions
- Admin-only endpoints for managing users and tasks
- Input validation with Zod
- Comprehensive error handling
- Swagger API documentation
- CORS enabled for frontend integration
- PostgreSQL database

Tech Stack
Backend: Node.js, Express.js, PostgreSQL, JWT, bcrypt, Zod
Frontend: React, Axios, React Router
Documentation: Swagger/OpenAPI

Project Structure
backend/
  src/
    controllers/
      authController.js - Authentication request handlers
      taskController.js - Task CRUD handlers
      adminController.js - Admin operations handlers
    middlewares/
      auth.js - JWT verification middleware
      authorize.js - Role-based access control middleware
      validate.js - Input validation middleware
      errorHandler.js - Error handling middleware
    routes/
      auth.js - Authentication endpoints
      tasks.js - Task endpoints
      admin.js - Admin endpoints
      index.js - Route aggregator
    services/
      authService.js - Authentication business logic
      taskService.js - Task business logic
    utils/
      errors.js - Error handling utilities
      schemas.js - Zod validation schemas
    db.js - Database connection
    swagger.js - Swagger configuration
    index.js - Application entry point
  setupAdmin.js - Admin user setup script
  schema.sql - Database schema

frontend/
  src/
    pages/
      Register.js - Registration page
      Login.js - Login page
      Dashboard.js - Protected dashboard with task management
    services/
      api.js - Axios client with JWT interceptor
    App.js - Main router
  public/
    index.html - HTML template

Setup Instructions

Prerequisites
Node.js (v14 or higher)
PostgreSQL (v12 or higher)
npm or yarn

Backend Setup
1. Navigate to the backend directory
   cd backend

2. Install dependencies
   npm install

3. Create .env file in backend directory
   DATABASE_URL=postgresql://username:password@localhost:5432/primetrade
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRES_IN=1d
   PORT=4000

4. Initialize the database
   Run schema.sql in PostgreSQL:
   psql -U postgres -d primetrade -f schema.sql

5. Start the server
   npm start
   Server will run on http://localhost:4000

Frontend Setup
1. Navigate to the frontend directory
   cd frontend

2. Install dependencies
   npm install

3. Start the development server
   npm start
   Frontend will run on http://localhost:3000

Database Schema
Users table:
- id: Primary key
- email: Unique email address
- password_hash: Bcrypted password
- role: 'user' or 'admin' (default: 'user')
- created_at: Timestamp

Tasks table:
- id: Primary key
- user_id: Foreign key to users
- title: Task title
- description: Task description
- created_at: Timestamp
- updated_at: Timestamp

API Endpoints

Authentication
POST /api/v1/auth/register
Register a new user
Request: { email, password }
Response: { id, email, role }

POST /api/v1/auth/login
Login user and get JWT token
Request: { email, password }
Response: { token, user: { id, email, role } }

Tasks (All endpoints require JWT token)
GET /api/v1/tasks
Get all tasks (authenticated users)

GET /api/v1/tasks/:id
Get a specific task by ID

POST /api/v1/tasks
Create a new task (users and admins)
Request: { title, description }

PUT /api/v1/tasks/:id
Update a task (admin only)
Request: { title, description }

DELETE /api/v1/tasks/:id
Delete a task (admin only)

Admin (Admin only)
POST /api/v1/admin/register-admin
Register a new admin user (existing admin only)
Request: { email, password }

Authentication & Authorization
JWT tokens are issued on login and expire after 1 day
Passwords are hashed using bcrypt with 10 salt rounds
Role-based access control:
  - Users: Can view and create their own tasks
  - Admins: Can view, create, update, and delete all tasks

Admin Setup
To create an admin user, run:
node setupAdmin.js email@gmail.com password

This will create or update a user with admin role.

API Documentation
Interactive Swagger UI is available at:
http://localhost:4000/api-docs

You can test all endpoints directly in the Swagger interface.

Frontend Features
Registration page: Create new user account
Login page: Authenticate with email and password
Protected dashboard: Accessible only with valid JWT token
Task management: Create, view, and delete tasks (admins can also update)
Token storage: JWT stored in localStorage and attached to all requests
Error messages: Clear feedback for all API operations

Running the Application
1. Start the backend server
   cd backend
   npm start

2. In a new terminal, start the frontend
   cd frontend
   npm start

3. Open http://localhost:3000 in your browser

4. View API documentation at http://localhost:4000/api-docs

Error Handling
All errors return appropriate HTTP status codes:
- 200: Successful request
- 201: Resource created
- 400: Bad request (validation error)
- 401: Unauthorized (missing or invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not found
- 500: Server error

Console Logging
Backend logs requests, successful operations, and errors
Frontend logs API requests, responses, and client-side errors
Check browser console (F12) and backend terminal for debugging

Troubleshooting

CORS Error
Make sure backend is running and CORS middleware is enabled.
Check that frontend is accessing correct backend URL.

Database Connection Error
Verify PostgreSQL is running
Check DATABASE_URL environment variable
Ensure database exists and schema is initialized

JWT Token Error
Make sure token is stored in localStorage after login
Check that Authorization header is being sent in requests
Verify JWT_SECRET matches between login and verification

Admin Access Denied
Run setupAdmin.js to set correct role in database
Verify user has 'admin' role in database
