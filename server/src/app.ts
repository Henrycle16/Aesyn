import express from "express";
import { config } from 'dotenv';
import userRoute from './routes/userRoute';
import queriesRoute from './routes/queriesRoute';
import authRoute from './routes/authRoute';
import creatorRoute from './routes/creatorRoute';
import instagramRoute from './routes/instagramRoute';
import brandRoute from './routes/brandRoute';
import cors from 'cors';

config();

// Initalizing express server
const app = express();

app.use(cors(
    {
        origin: '*'
    }
));

app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/creators', creatorRoute);
app.use('/api/brands', brandRoute);
app.use('/api/query', queriesRoute);
app.use('/api/instagram', instagramRoute);

console.log("App is running");

export default app;