import express from "express";
import { 
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUserByID,
  updateUserByID
 } from "../controllers/userController.js";
const router = express.Router();

// post to /api/users for register, get to get all users
// full route in server.js
router.route('/').post(registerUser).get(getUsers);

// logout
router.post('/logout', logoutUser);

// login
router.post('/login', authUser)

// get and update user profile
router.route('/profile').get(getUserProfile).put(updateUserProfile);

// delete, update and get user by ID
router.route('/:id').delete(deleteUserByID).put(updateUserProfile).get(getUserByID);


export default router;