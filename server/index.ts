import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getAll, getCategory, getFeatured, search } from './routes';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Allow cross-origin requests

app.get("/api/getAll", getAll);
app.get("/api/getCategory", getCategory);
app.get("/api/getFeatured", getFeatured);
app.get("/api/search", search);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});