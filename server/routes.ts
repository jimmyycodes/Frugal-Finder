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
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;


// Create a connection pool
const pool = mysql.createPool(dbConfig);

const queryGetAllProductsFromAllStores = `
    SELECT p.pid, p.sid, s.name AS store, p.name AS product, p.amount, p.description, p.price, p.searchQuery, p.imagePath
    FROM Products p
    JOIN Stores s ON p.sid = s.sid
    LIMIT 25;
    `;
const queryGetAllProductsFromAllStoresFromcategory = `
        SELECT p.pid, s.sid, s.name AS store, p.name AS product, p.price, p.amount, p.description, p.searchQuery, p.imagePath
        FROM Products p
        JOIN Stores s ON p.sid = s.sid
        WHERE p.searchQuery LIKE ?
        LIMIT 25;
        `;
const queryGetProductsByPIDs = `
    SELECT p.pid, s.sid, s.name AS store, p.name AS product, p.amount, p.description, p.price, p.searchQuery, p.imagePath
    FROM Products p
    JOIN Stores s ON p.sid = s.sid
    WHERE p.pid IN (?)
    LIMIT 25;
`;
const queryGetSearchedProductsAllStoresByCategoryAndName = `
        SELECT p.pid, s.sid, s.name AS store, p.name AS product, p.price, p.amount, p.description, p.searchQuery, p.imagePath
        FROM Products p
        JOIN Stores s ON p.sid = s.sid
        WHERE p.searchQuery LIKE ? OR p.name LIKE ?
        LIMIT 25;
        `;

// get all products
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const [results] = await pool.query(queryGetAllProductsFromAllStores);
        const updatedResults = await replaceItemImages(results);
        res.json({ updatedResults });
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
        const updatedResults = await replaceItemImages(results);
        res.json({ updatedResults });
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
        const updatedResults = await replaceItemImages(results);
        res.json({updatedResults});
    } catch(error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// get product based on category query in url
export const search = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search;

        if (!search) {
            res.status(400).json({ error: "Missing search query parameter" });
            return;
        }

        const searchQuery = `%${search}%`;
        const [results] = await pool.query(queryGetSearchedProductsAllStoresByCategoryAndName, [searchQuery, searchQuery]);
        const updatedResults = await replaceItemImages(results);
        res.json(updatedResults);
    } catch(error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Functions
const replaceImage = async (item: any) => {
    try {
        const query = item.searchQuery || item.product;
        const image = await getRelatedImage(query);
        return { ...item, imagePath: image };
    }
    catch (error) {
        console.error("Error fetching images:", error);
        return { ...item, imagePath: "" };
    }
}

const replaceItemImages = async (queryResult: mysql.QueryResult) => {
    if (!Array.isArray(queryResult)) {
        console.error("Expected an array of rows but received:", queryResult);
        return queryResult;
    }

    const updatedRows = await Promise.all(queryResult.map(replaceImage));

    return updatedRows;
}

const getRelatedImage = async (query: string) => {
    // fetch image from pixabay

    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const hits = data.hits;
      const randomIndex = Math.floor(Math.random() * hits.length);
      return hits[randomIndex].webformatURL;
    } catch (error) {
      console.error("Error fetching images:", error);
      return "";
    }
  };