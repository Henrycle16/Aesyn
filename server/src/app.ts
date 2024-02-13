import express from "express";
import { config } from 'dotenv';
import userRoute from './routes/userRoute';

config();

// Initalizing express server
const app = express();

app.use(express.json());

app.use('/users', userRoute);

console.log("App is running");

export default app;