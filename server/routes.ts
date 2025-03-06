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

const queryGetAllProductsFromAllStores = `
    SELECT p.pid, p.sid, s.name AS store, p.name AS product, p.amount, p.description, p.price, p.searchQuery, p.imagePath 
    FROM Products p 
    JOIN Stores s ON p.sid = s.sid
    `;
const queryGetAllProductsFromAllStoresFromcategory = `
        SELECT p.pid, s.sid, s.name AS store, p.name AS product, p.price, p.amount, p.description, p.searchQuery, p.imagePath 
        FROM Products p 
        JOIN Stores s ON p.sid = s.sid 
        WHERE p.searchQuery LIKE ?;
        `;
const queryGetProductsByPIDs = `
    SELECT p.pid, s.sid, s.name AS store, p.name AS product, p.amount, p.description, p.price, p.searchQuery, p.imagePath 
    FROM Products p 
    JOIN Stores s ON p.sid = s.sid  
    WHERE p.pid IN (?);
`;

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

// get featured
export const getFeatured = async (req: Request, res: Response): Promise<void> => {
    const arrayOfPIDs = [136, 140, 142, 143, 146, 151, 160, 165, 168];

    try {
        const [results] = await pool.query(queryGetProductsByPIDs, [arrayOfPIDs]);
        res.json({ results });
    } catch (error) {
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