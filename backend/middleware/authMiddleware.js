import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// protect routes for users that are registered
// remember to include 'next' to move on to the next middleware when done
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie in userController.js
  token = req.cookies.jwt;

  if(token) {
    try {
      // decode the token to  get user ud
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userID).select('-password'); // dont include the password beucase it's hashed so no point
      next(); // move on to the next middle ware
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// protect routes for admin
const admin = (req, res, next) => {
  // Check if req.user exists first
  if (req.user) {
    console.log("isAdmin:", req.user.isAdmin); // Log the value of isAdmin
    if (req.user.isAdmin) {
      return next(); // Continue to the next middleware
    }
  }
  else{
    console.log("user doesnt exist")
  }

  // If req.user does not exist or isAdmin is not true
  res.status(401);
  throw new Error('Not authorized as admin');
};


export { protect, admin };