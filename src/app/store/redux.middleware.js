import { isFulfilled } from "@reduxjs/toolkit";

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const REDUX_MIDDLEWARE = () => (next) => async (action) => {
  if (isFulfilled(action)) {
    await delay(500);
  }
  return next(action);
};

export default REDUX_MIDDLEWARE;
