import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";
// example of using express for routing
const router = express.Router();

// using router.get to break your routes into separate files. This keeps your main server file (server.js) clean and organized. By using Router, you can group routes by purpose, like having all product-related routes in one file (productRoutes.js).

// / stands for /api/products
// router.get('/', asyncHandler(async (req, res) => {
//   // get data from database
//   const products = await Product.find({});
//   // throw new Error('some error');  
//   res.json(products);
// }));

// after updates with productController
// /api/products
// full route in server.js
router.route('/').get(getProducts);

// route for single product
router.route('/:id').get(getProductById);

export default router;