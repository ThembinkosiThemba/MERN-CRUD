import express from "express";
import mongoose from "mongoose";

import FoodMessage from "../models/FoodModel.js";

const router = express.Router()

export const getFoods = async (req, res) => {
    try {
        const foodMessage = await FoodMessage.find()
        res.status(200).json(foodMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getFood = async (req, res) => {
    const { id } = req.params;
    
    try {
        const food = await FoodMessage.findById(id)
        res.status(200).json(food)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createFood = async ( req, res ) => {
    const { title, message, selectedFile, creator, tags } = req.body

    const newFood = new FoodMessage({ title, message, selectedFile, creator, tags})

    try {
        await newFood.save()
        res.status(200).json(newFood)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

} 

export const updateFood = async (req, res ) => {
    const { id } = req.params
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedFood = { title, message, creator, selectedFile, tags, _id: id} 
    await FoodMessage.findByIdAndUpdate(id, updatedFood, { new: true })

    res.json(updateFood)
}

export const deleteFood = async (req, res ) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await FoodMessage.findByIdAndRemove(id)

    res.json({ message: "Post deleted successfully" })

}

export const likeFood = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const food = await FoodMessage.findById(id);

    const updatedFood = await FoodMessage.findByIdAndUpdate(id, { likeCount: food.likeCount + 1 }, { new: true });
    
    res.json(updatedFood);
}

export default router;