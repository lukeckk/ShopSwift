import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"; 

// @desc Auth user & get token
// @route POST / api/users/login
// @access Public 
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  // Email Validation
  // check if a user exist by seeing if the database contains the email  
  const user = await User.findOne({email})

  // is user exists, return an object of the user's details && validate pasword using matchPassword() in userModel.jsnp
  if(user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({                
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password')
  }
});

// @desc register user and set cookie
// @route POST / api/users
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if user exists
  const userExists = await User.find({email});

  if(userExists.length > 0) {
    res.status(400);
    throw new Error('User already exists');
  } 

  // else create a new user and add to database using Moongoose function create()
  const user = await User.create({
    name,
    email,
    password
  });

  // if the new user exists now, repond with the info
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc logout user and clear cookie
// @route POST / api/users/logout
// @access Private 
const logoutUser = asyncHandler(async (req, res) => {
  // set cookie with naem 'jwt' to expire
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: 'Logged out successfully' }); 
});

// @desc Get user profile
// @route GET / api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else{
    res.status(404);
    throw new Error('User not found');
  }

});

// @desc update user profile
// @route Put / api/users/profile  'no id required because JWT token is used'
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    // if the username from the database matches the one in request cookie, we'll set that to req.body.name or the one in database
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // password is differnt than name and email because it is hashed
    if(req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
  
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