import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (foods = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return foods.map((food) => (food._id === action.payload._id ? action.payload : food));
    case CREATE:
      return [...foods, action.payload];
    case UPDATE:
      return foods.map((food) => (food._id === action.payload._id ? action.payload : food));
    case DELETE:
      return foods.filter((food) => food._id !== action.payload);
    default:
      return foods;
  }
};
