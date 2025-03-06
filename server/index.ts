import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getAll, getCategory, getFeatured } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/api/getAll", getAll);
app.get("/api/getCategory", getCategory);
app.get("/api/getFeatured", getFeatured);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});