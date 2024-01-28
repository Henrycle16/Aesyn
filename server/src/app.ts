import express from "express";
import { config } from 'dotenv';

config();

// Initalizing express server
const app = express();

export default app;