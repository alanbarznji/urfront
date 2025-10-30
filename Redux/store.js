import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import OrderReducer from "./Reducer/OrderReducer";
import OrderItemsReducer from "./Reducer/OrderItemReducer";
import AuthReducer from "./Reducer/AuthReducer";
import ProductReducer from "./Reducer/ProductReducer";
import CategoryReducer from "./Reducer/CategoryReducer";
import ReviewReducer from "./Reducer/ReviewReducer";
 
 

const rootReducer = combineReducers({
  Order: OrderReducer,
  OrderItems: OrderItemsReducer,
  Auth:AuthReducer,
  Product:ProductReducer,
  Category:CategoryReducer,
  Review:ReviewReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
