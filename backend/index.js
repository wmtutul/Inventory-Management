import express  from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db_connection/connection.js";
import authRoutes from './src/routes/auth.js';
import categoryRoutes from './src/routes/category.js';


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dotenv.config();




//routing
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);

//Database Connection
const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
        connectDB();
        console.log(`Server is running on port: http://localhost:${PORT}`)
})







