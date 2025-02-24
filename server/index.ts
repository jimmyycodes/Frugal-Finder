import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs, { PathOrFileDescriptor } from "fs";

// might move sql stuff to different file
import mysql, { ConnectionOptions } from "mysql2";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// fill out credentials in .env
const dbConfig: ConnectionOptions = {
    host: process.env.HOST!,
    user: process.env.USER!,
    password: process.env.PASSWORD!,
    database: process.env.DATABASE!,
    port: parseInt(process.env.DBPORT!),
    ssl: {ca: fs.readFileSync(process.env.SSLPATH!)}
}
const conn = mysql.createConnection(dbConfig);

conn.connect(
    function (err) {
        if (err) {
            console.log("Can't connect. Error:");
            throw err;
        } else {
            console.log("Connection established.");
            readData();
        }
    }
)

function readData() {
    conn.query('SELECT * FROM tjproducts',
        function (err, results, field) {
            if (err) {
                throw err;
            } else {
                for (const result in results) {
                    console.log('Row: ' + JSON.stringify(result));
                }
            }
        }
    )
    conn.end(
        function (err) {
            if (err) {
                throw err;
            } else {
                console.log('Closing connection.');
            }
        }
    )
}


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});