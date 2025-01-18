import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//Getting all Users
router.get("/", async(req, res) => {
    const collection = await db.collection("users");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
})

//Getting User by ID
router.get("/:id", async(req, res) => {
    const collection = await db.collection("users");
    let query = {_id: new ObjectId(req.params.id)}
    let result = await collection.findOne(query);
    if(!result){
        res.send("User Not Found!").status(404);
    } else{
        res.send(result).status(200);
    }
})

//Authenticating User with Email and Password
router.post("/:email/:password", async(req, res) => {
    const collection = await db.collection("users");
    const query = {email: req.params.email, password: req.params.password};
    const result = await collection.findOne(query);
    res.send(result);
})

//Registering a New User
router.post("/", async(req, res) => {
    try{
        let newUser = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            products: req.body.products,
            shoppingList: req.body.shoppingList,
            favVendors: req.body.favVendors
        }
        const collection = await db.collection("users");
        let result = await collection.insertOne(newUser);
        if(!result){
            res.send(false).status(401);
        } else{
            res.send(true).status(200);
        }
    } catch(err){
        console.log(err);
        res.send(err).status(500);
    }
});

//Getting User by Email
router.get("/:email", async(req, res) => {
    const collection = await db.collection("users");
    let query = {email: req.params.email}
    let result = await collection.findOne(query);
    res.send(result);
})

//Updating a User
router.patch("/:id", async(req, res) => {
    try{
        const collection = await db.collection("users");
        const query = {_id: new ObjectId(req.params.id)};
        let updates = {
            $set: {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                products: req.body.products,
                shoppingList: req.body.shoppingList,
                favVendors: req.body.favVendors
            }
        }
        const result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch(err){
        console.log(err);
        res.send("Error Updating User").status(500);
    }
});

//Deletes a User by Id
router.delete("/:id", async(req, res) => {
    try{
        const collection = await db.collection("users");
        const query = {_id: new ObjectId(req.params.id)};
        const result = collection.deleteOne(query);
        res.send(result).status(200);
    } catch(err){
        console.log(err);
        res.send("Error Deleting User").status(500);
    }
});

export default router;