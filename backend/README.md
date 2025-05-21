# WSmartBuy Backend

This is the backend service for the WSmartBuy application, handling user authentication and user preferences.

## Features

- User registration and authentication
- User profile preferences storage
- MongoDB integration

## Setup

1. Install dependencies:
```
pip install -r requirements.txt
```

2. Start the server:
```
python app.py
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "success": true, "user_id": "unique-user-id" }`

- `POST /api/login` - Login a user
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "success": true, "user_id": "unique-user-id" }`

### User Preferences

- `POST /api/preferences` - Save user preferences
  - Request body: `{ "user_id": "unique-user-id", ...preference fields }`
  - Response: `{ "success": true }`

- `GET /api/preferences/:user_id` - Get user preferences
  - Response: `{ "success": true, "preferences": {...} }` 