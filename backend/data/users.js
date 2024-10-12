// holds dummy user data with hashed password to be inserted into database
import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  }
  
]

export default users;