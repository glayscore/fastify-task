
# Fastify Test Server

This project is a Fastify-based web server that implements user authentication, item management, and purchasing functionality using PostgreSQL and Redis. The server supports data caching through Redis and provides several API endpoints.

## Tech Stack

- **Fastify** — Web framework for Node.js  
- **PostgreSQL** — Relational database  
- **Redis** — Data caching  
- **Docker and Docker Compose** — Containerization and dependency management  
- **TypeScript** — Static typing  

## Installation and Startup

1. **Start Docker Containers**:

```bash
docker-compose up -d  
```
This command will build and start the containers for the server, PostgreSQL database, and Redis cache. The application will be accessible at http://localhost:3000.

2. **Stop Docker Containers**:

To stop the containers, run:

```bash
docker-compose down  
```

## API Endpoints

Below is a list of available API endpoints, with example requests.

1. ***Authentication***

***User Login***

`URL: /auth/login`

Method: POST

Description: Verifies the user's login credentials.

Request Body:

```json
{  
  "username": "user1",  
  "password": "password123"  
}  
```
Example Request:

```bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "user1", "password": "password123"}'  
```
***Change Password***

`URL: /auth/change-password`

Method: POST

Description: Changes the user's password.

Request Body:

```json
{  
  "username": "user1",  
  "currentPassword": "password123",  
  "newPassword": "newpassword123"  
}
```

Example Request:

```bash
curl -X POST http://localhost:3000/auth/change-password -H "Content-Type: application/json" -d '{"username": "user1", "currentPassword": "password123", "newPassword": "newpassword123"}'  
```

2. ***Items***
***Get Minimum Item Prices***

`URL: /api/items`

Method: GET

Description: Returns a list of items with their minimum prices. Data is cached in Redis.

Example Request:

```bash
curl -X GET http://localhost:3000/api/items  
```
3. **Purchase**
***Purchase Item***

`URL: /api/purchase`

Method: POST

Description: Allows a user to purchase an item if they have sufficient balance.

Request Body:

```json
{  
  "userId": 1,  
  "itemId": 1  
}  
```

Example Request:

```bash
curl -X POST http://localhost:3000/api/purchase -H "Content-Type: application/json" -d '{"userId": 1, "itemId": 1}'  
```

## Additional Information
Database: PostgreSQL is used to store data for users, items, and purchases.
Caching: Redis is used to cache data for item minimum prices.
Environment Variables: Settings for database and Redis connections are specified in the .env file.

## Testing
To test the functionality, use the curl examples provided above.

