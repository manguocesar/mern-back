import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import customerRouter from './routes/customer.js';
import authRoute from './routes/auth.js';
import cookieParser from "cookie-parser"

const app = express()
app.use(cors())
dotenv.config()


const connect = async () => {
  await mongoose.connect(process.env.MONGOURL), 
  console.log("connect");
  };

mongoose.connection.on('disconnected', () => {
  console.log("disconnected");
});

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use('/api/customer', customerRouter);

app.get('/', (req, res) => {
  res.send('Bienvenu')
});

app.listen(process.env.PORT, () => {
  connect(),
    console.log("connect app")

});
