import express from "express";
import { config } from 'dotenv';
import userRoute from '../src/routes/userRoute';
import queriesRoute from '../src/routes/queriesRoute';
import authRoute from '../src/routes/authRoute';
import creatorRoute from '../src/routes/creatorRoute';
import instagramRoute from '../src/routes/instagramRoute';
import brandRoute from '../src/routes/brandRoute';
import waitlistRoute from '../src/routes/waitlistRoute';
import s3Route from "../src/routes/s3Route";
import cors from 'cors';

config();

// Initalizing express server
const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors(
//     {
//         origin: '*'
//     }
// ));

app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/creators', creatorRoute);
app.use('/api/brands', brandRoute);
app.use('/api/query', queriesRoute);
app.use('/api/instagram', instagramRoute);
app.use('/api/s3', s3Route);
app.use('/api/waitlist', waitlistRoute);

app.get("/", (req, res) => res.send("Express on Vercel"));

console.log("App is running");

import { connectToDatabase } from "../src/db/mongodb-connection";
import { connectToPinecone } from "../src/db/pineconedb-connection";

// Initalizing MongoDB connection
connectToDatabase()
  .then(async () => {
    app.listen(PORT, () =>
      console.log(`Server listening on port ${PORT} & connected to MongoDB`),
    );
  })
  .catch((error) => console.log(error));

// Initalizing PineconeDB connection
connectToPinecone()
  .then(() => {
    console.log("Pinecone connection successful");
  })
  .catch((error) => console.log(error));

export default app;