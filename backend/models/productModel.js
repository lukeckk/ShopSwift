import mongoose from "mongoose";
import { describe } from "node:test";
import { catchError, timestamp } from "rxjs";


const reviewSchema = mongoose.Schema({
  user: {
    // id that has a _ in front known as ObjectId
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // coming from the "User" reference
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
})

// this contains all the fields of the data
const productSchema = new mongoose.Schema({

  // curly bracket not necessary if just specifying one thing
  user: {
    // id that has a _ in front known as ObjectId
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // coming from the "User" reference
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
    
  }, {
    // automatically add the createdApp field
    timeStramps: true,
  }
);


const Product = mongoose.model("Product", productSchema);

export default Product;
