import mongoose from "mongoose";
import { type } from "os";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // user is non-admin by default
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true
});

// Password Validation
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// .pre() allows us to do something before it is saved into the database, before 'save'  
userSchema.pre('save', async function(next) {
  // move on if we are not modifying the password
  if(!this.isModified('password')) {
    next();
  }

  // else we will hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
 
})

const User = mongoose.model("User", userSchema);

export default User;