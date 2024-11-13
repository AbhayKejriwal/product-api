// Import the express module
const express = require("express");

// Create an instance of express
const app = express();

// Define the port number
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample product data
let products = [{
        id: 1,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with adjustable DPI.",
        price: 25.99,
        quantity: 50
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with blue switches.",
        price: 79.99,
        quantity: 30
    }
];

// Variable to keep track of the current product ID
let currentId = 3;

// Route to get all products
app.get("/products", (req, res) => {
    res.status(200).json(products);
});

// Route to get a product by ID
app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    // If the product is not found, return a 404 error
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    // If the product is found, return it
    res.status(200).json(product);
});

// Route to create a new product
app.post("/products", (req, res) => {
    const { name, description, price, quantity } = req.body;
    // Check if the required fields are provided
    if (!name || !price) {
        res.status(400).json({ error: "Name and price are required" });
        return;
    }
    if ( typeof price !== "number" || price <= 0) {
        res.status(400).json({ error: "Price must be a positive number" });
        return;
    }
    // Create a new product object, add it to the products array, and return it
    const newProduct = {
        id: currentId++,
        name,
        description: description || '',
        price,
        quantity: quantity || 0,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Route to update a product by ID
app.put("/products/:id", (req, res) => {
    // Find the product by ID
    const product = products.find(p => p.id === parseInt(req.params.id));

    // If the product is not found, return a 404 error
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    // Get the fields to update from the request body
    const { name, description, price, quantity } = req.body;

    // Update the product fields if they are provided in the request body
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;

    // Return the updated product
    res.status(200).json(product);
});

// Route to delete a product by ID
app.delete("/products/:id", (req, res) => {
    // Find the index of the product by ID
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    // If the product is not found, return a 404 error
    if (productIndex === -1) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    // Remove the product from the products array and return a 204 status
    products.splice(productIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

