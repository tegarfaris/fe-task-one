import { createAsyncThunk } from "@reduxjs/toolkit";

export const REQUEST_GET_LIST_PRODUCT = createAsyncThunk(
  "products/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://68c8cd23ceef5a150f6257fd.mockapi.io/products/all"
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const REQUEST_ADD_PRODUCT = createAsyncThunk(
  "products/add-product",
  async (newProduct, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://68c8cd23ceef5a150f6257fd.mockapi.io/products/all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );
      return res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
