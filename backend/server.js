import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5010;

// connect to MongoDB
connectDB();

const app = express();

// Body parser middleware (this will allow the object to be printed in the console such as email and password when logging in)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware, allows use to access request.cookie
app.use(cookieParser());

// first route
app.get('/', (req, res) => {
  res.send('API is running... this can be found in server.js');
});

// /api/products route will take us to productRoutees
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


// this will print out in colsole when npm start
app.listen(port, () => console.log(`Server running on port ${port}`));
