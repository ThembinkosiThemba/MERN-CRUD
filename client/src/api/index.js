import axios from 'axios';

const url = 'http://localhost:5000/foods';

export const fetchFoods = () => axios.get(url);
export const createFood = (newFood) => axios.post(url, newFood);
export const likeFood = (id) => axios.patch(`${url}/${id}/likeFood`);
export const updateFood = (id, updatedFood) => axios.patch(`${url}/${id}`, updatedFood);
export const deleteFood = (id) => axios.delete(`${url}/${id}`);