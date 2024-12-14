import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
 
// @desc Auth user & get token
// @route POST / api/users/login
// @access Public 
const authUser = asyncHandler(async (req, res) => {
  res.send('auth user');
});

// @desc register user
// @route POST / api/users
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// @desc logout user and clear cookie
// @route POST / api/users/logout
// @access Private 
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user');
});

// @desc Get user profile
// @route GET / api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// @desc update user profile
// @route Put / api/users/profile  'no id required because JWT token is used'
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// @desc Get all users
// @route GET/ api/users
// @access Private/admin 'because this is only for admin'
const getUsers = asyncHandler(async (req, res) => {
  res.send('get all users');
});

// @desc Get user by ID
// @route GET/ api/users/:id
// @access Private/admin 'because this is only for admin'
const getUserByID = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

// @desc Delete users
// @route DELETE/ api/users/:id
// @access Private/admin 'because this is only for admin'
const deleteUserByID = asyncHandler(async (req, res) => {
  res.send('delete user by id');
});

// @desc Update users
// @route Put/ api/users/:id
// @access Private/admin 'because this is only for admin'
const updateUserByID= asyncHandler(async (req, res) => {
  res.send('update users');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUserByID,
  updateUserByID

}