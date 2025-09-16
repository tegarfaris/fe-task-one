import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../features/products/productsSlice";
import jobsReducer from "../../features/job/jobsSlice";
import REDUX_MIDDLEWARE from "./redux.middleware";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    jobs: jobsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(REDUX_MIDDLEWARE),
});
