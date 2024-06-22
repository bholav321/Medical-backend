import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRouter from './routers/user.route.js'
import DoctorRouter from './routers/doctor.route.js'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/user",UserRouter);
app.use("/doctor",DoctorRouter)
mongoose.connect("mongodb+srv://bholav321:UigMQDk6vJfMi1xx@cluster0.8hxaoer.mongodb.net/Medical").then(()=>{
    console.log("Connected to MongoDB");
    app.listen(2024,()=>{
        console.log("Server started...")
    })
}).catch(err=>{
    console.log(err);
});