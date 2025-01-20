import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import multer from "multer";
import path from "path";

const productRouter = express.Router();

//Getting all Products
productRouter.get("/", async(req, res) => {
    const collection = db.collection("products");
    const result = collection.find({}).toArray();
    res.send(result).status(200);
});

//Creating a new Product
productRouter.post("/", async(req, res) => {
    try{
        const collection = db.collection("products");
        const result = await collection.insertOne(req.body);
        res.send(result).status(200);
    } catch(err){
        res.send(err).status(500);
    }
});

export default productRouter;