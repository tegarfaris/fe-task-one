import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_ADD_PRODUCT, REQUEST_GET_LIST_PRODUCT } from "./actions";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    pending: false,
    success: false,
    isEmpty: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REQUEST_GET_LIST_PRODUCT.pending, (state) => {
        state.pending = true;
        state.success = false;
      })
      .addCase(REQUEST_GET_LIST_PRODUCT.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
        state.list = action.payload;
        state.isEmpty = action.payload.length === 0;
      })
      .addCase(REQUEST_GET_LIST_PRODUCT.rejected, (state) => {
        state.pending = false;
        state.success = false;
        state.isEmpty = true;
      })

      // add product
      .addCase(REQUEST_ADD_PRODUCT.pending, (state) => {
        state.pending = true;
      })
      .addCase(REQUEST_ADD_PRODUCT.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
      })
      .addCase(REQUEST_ADD_PRODUCT.rejected, (state) => {
        state.pending = false;
        state.success = false;
      });
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
