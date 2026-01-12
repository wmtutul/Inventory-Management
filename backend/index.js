import express  from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db_connection/connection.js";
import authRoutes from './src/routes/auth.js';
import categoryRoutes from './src/routes/category.js';
import supplierRoutes from './src/routes/supplier.js';
import productRoutes from './src/routes/product.js';
import userRoute from './src/routes/user.js';
import orderRoute from './src/routes/order.js';
import dashboardRouter from './src/routes/dashboard.js';


const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();



//routing
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/dashboard', dashboardRouter);





//Database Connection
const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
        connectDB();
        console.log(`Server is running on port: http://localhost:${PORT}`)
})








