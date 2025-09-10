import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api",chatRoutes);

app.listen(port ,()=>{
     console.log(`server running on ${port}`);
     connectDB();
});

const connectDB = async()=>{
     try{
         await mongoose.connect(process.env.MONGODB_URI);
         console.log("connected with database");
     }catch(e){
         console.log("failed to connect with database",e);
     }
}







