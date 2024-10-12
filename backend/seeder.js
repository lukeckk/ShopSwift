import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";
// for seeding the database


dotenv.config();

connectDB();

// insert data. not using sql query due to MongoDB NoSql database
const importData = async () => {
  try{
    // delete everything before importing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // store array of users in createdUsers
    const createdUsers = await User.insertMany(users); 
    // retrieve admin which is the first one in the array
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      // return an object/dictionary/hashmap of product data, and use value/user id of adminUser
      return { ...product, user: adminUser};
    });

    await Product.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit();

  }catch(error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

// method for deleting data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit;
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
} 

// using terminal to call the methods above
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
