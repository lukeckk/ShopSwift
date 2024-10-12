import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import products from './data/products.js';
const port = process.env.PORT || 5000;

// connect to MongoDB
connectDB();

const app = express();

// first route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// route for all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// route for single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

// this will print out in colsole when npm start
app.listen(port, () => console.log(`Server running on port ${port}`))
