import express, { Express } from "express";
import bodyParser from 'body-parser';

const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());

app.listen(port, () => console.log('Server listening on ${port}'));