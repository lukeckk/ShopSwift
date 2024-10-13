import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
 

// functions call to get product from productRoutes.js

// @desc Fetch all products
// @route GET / api/products
// @access Public 
const getProducts = asyncHandler(async (req, res) => {
    // get data from database
    const products = await Product.find({});
    // throw new Error('some error');  
    res.json(products);

});

// @desc Fetch a products
// @route GET / api/products/:id
// @access Public 
const getProductById = asyncHandler(async (req, res) => {
   // to get a single product
  const product = await Product.findById(req.params.id);

  // error handling for if there is no product
  if(product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }

});


export {getProducts, getProductById };