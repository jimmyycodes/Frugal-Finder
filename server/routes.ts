import { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import mysql, { ConnectionOptions } from "mysql2/promise";

dotenv.config();

// fill out credentials in .env
const dbConfig: ConnectionOptions = {
    host: process.env.HOST!,
    user: process.env.USER!,
    password: process.env.PASSWORD!,
    database: process.env.DATABASE!,
    port: parseInt(process.env.DBPORT!),
    ssl: {ca: fs.readFileSync(process.env.SSLPATH!)}
}


// Create a connection pool
const pool = mysql.createPool(dbConfig);
const queryGetAllProductsFromAllStores = 'SELECT s.name AS store, p.name AS product, sp.price, sp.searchQuery, sp.imagePath FROM StoreProducts sp JOIN Stores s ON sp.sid = s.sid JOIN ProductInfo p ON sp.pid = p.pid;';
const queryGetAllProductsFromAllStoresFromcategory = 'SELECT s.name AS store, p.name AS product, sp.price, sp.searchQuery, sp.imagePath FROM StoreProducts sp JOIN Stores s ON sp.sid = s.sid JOIN ProductInfo p ON sp.pid = p.pid WHERE sp.searchQuery LIKE ?;';

// get all products
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const [results] = await pool.query(queryGetAllProductsFromAllStores);
        res.json({results});
    } catch(error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// get product based on category query in url
export const getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = req.query.category;

        if (!category) {
            res.status(400).json({ error: "Missing category query parameter" });
            return;
        }

        const searchQuery = `%${category}%`;
        const [results] = await pool.query(queryGetAllProductsFromAllStoresFromcategory, [searchQuery]);
        res.json({results});
    } catch(error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}