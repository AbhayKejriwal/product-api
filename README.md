# Product Inventory REST API

This project is a RESTful API built with Node.js and Express for managing a basic inventory of products. It provides endpoints to create, read, update, and delete products, with each endpoint responding in JSON format and appropriate HTTP status codes.

## Project Description

The Product Inventory API allows clients to perform the following operations:

- **GET /products**: Retrieve a list of all products.
- **GET /products/:id**: Retrieve details of a specific product by ID.
- **POST /products**: Add a new product to the inventory.
- **PUT /products/:id**: Update details of an existing product by ID.
- **DELETE /products/:id**: Remove a product from the inventory by ID.

Each product includes the following fields:
- `id`: Unique identifier for the product
- `name`: Name of the product (required)
- `description`: Brief description of the product (optional)
- `price`: Price of the product (required)
- `quantity`: Available quantity of the product (optional)

## Test Results

The test results screenshots are available in the Postman Test Results folder.