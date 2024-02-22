import express from "express";
import { config } from 'dotenv';
import userRoute from './routes/userRoute';
import queriesRoute from './routes/queriesRoute';

config();

// Initalizing express server
const app = express();

app.use(express.json());

app.use('/users', userRoute);
app.use('/query', queriesRoute);

console.log("App is running");

export default app;