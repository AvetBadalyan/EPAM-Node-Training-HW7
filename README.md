# Product Management API

This project is a simple Product Management API built with Node.js, Express, and TypeScript. It provides endpoints to manage products, including creating, updating, deleting, and retrieving products.

## Features

- Retrieve all products or filter by category
- Retrieve a product by ID
- Create a new product
- Update an existing product
- Partially update a product's manufacturer address
- Mark a product as deleted

## Project Structure

- **src/**

  - **controllers/**: Contains the controller logic handling HTTP requests and responses.
  - **data/**: Contains the `products.json` file with product data.
  - **middleware/** Contains the middlewares like asyncHandler, errorMiddleware and checkObjectid
  - **models/**: Defines TypeScript interfaces and models.
  - **routes/**: Contains the routes
  - **services/**: Contains the service logic for data operations.
  - **index.ts** main server file

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AvetBadalyan/EPAM-Node-Training-HW7.git
   cd EPAM-Node-Training-HW7
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Compile TypeScript code:

   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start at `http://localhost:3000`.

## Running in Development Mode

To run the server in development mode with hot-reloading:

```bash
npm run dev

Endpoints
GET /products Retrieve all products or filter by category (query parameter category).
GET /products/:id Retrieve a product by its ID.
POST /products Create a new product.
PUT /products/:id Update an existing product by ID.
PATCH /products/:id Partially update a product (e.g., manufacturer address).
DELETE /products/:id Mark a product as deleted.

Testing
Use Postman or any other API client to test the endpoints.
```
