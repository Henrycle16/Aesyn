import express from "express";
import { config } from 'dotenv';
import userRoute from './routes/userRoute';
import queriesRoute from './routes/queriesRoute';
import authRoute from './routes/authRoute';
import creatorRoute from './routes/creatorRoute';
<<<<<<< HEAD
import instagramRoute from './routes/instagramRoute';
import cors from "cors";
=======
import cors from 'cors';
>>>>>>> 810bd98a167b643f3be40925710b21afaf42b362

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
app.use('/api/creator', creatorRoute);
app.use('/api/query', queriesRoute);
app.use('/api/instagram', instagramRoute);

console.log("App is running");

export default app;