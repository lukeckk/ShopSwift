import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5010;

// connect to MongoDB
connectDB();

const app = express();

// first route
app.get('/', (req, res) => {
  res.send('API is running... this can be found in server.js');
});

// /api/products route will take us to productRoutees
app.use('/api/products', productRoutes)

app.use(notFound);
app.use(errorHandler);


// this will print out in colsole when npm start
app.listen(port, () => console.log(`Server running on port ${port}`))
