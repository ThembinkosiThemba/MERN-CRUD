import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getFoods = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFoods();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createFood = (food) => async (dispatch) => {
  try {
    const { data } = await api.createFood(food);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFood = (id, food) => async (dispatch) => {
  try {
    const { data } = await api.updateFood(id, food);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeFood = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeFood(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFood = (id) => async (dispatch) => {
  try {
    await api.deleteFood(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};