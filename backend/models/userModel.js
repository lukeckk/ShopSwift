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

const User = mongoose.model("User", userSchema);

export default User;