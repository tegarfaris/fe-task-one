import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../features/products/productsSlice";
import REDUX_MIDDLEWARE from "./redux.middleware";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(REDUX_MIDDLEWARE),
});
