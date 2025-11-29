import express  from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db_connection/connection.js";



const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


//Database Connection
const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
        connectDB();
        console.log(`Server is running on port: http://localhost:${PORT}`)
})




