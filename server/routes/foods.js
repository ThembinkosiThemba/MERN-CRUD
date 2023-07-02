import express from 'express';

import { getFoods, createFood, getFood, updateFood, deleteFood, likeFood } from '../controllers/food.js';

const router = express.Router();

router.get('/', getFoods);
router.post('/', createFood);
router.get('/:id', getFood);
router.patch('/:id', updateFood);
router.delete('/:id', deleteFood);
router.patch('/:id/likePost', likeFood);

export default router;