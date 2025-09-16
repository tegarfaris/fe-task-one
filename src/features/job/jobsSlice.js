import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_GET_LIST_JOB } from "./actions";
import { REQUEST_ADD_JOBS } from "./actions";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobList: [],
    pending: false,
    success: false,
    isEmpty: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(REQUEST_GET_LIST_JOB.pending, (state) => {
        state.pending = true;
        state.success = false;
      })
      .addCase(REQUEST_GET_LIST_JOB.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
        state.jobList = action.payload;
        console.log(action.payload, "reducer");
        state.isEmpty = action.payload.length === 0;
      })
      .addCase(REQUEST_GET_LIST_JOB.rejected, (state) => {
        state.pending = false;
        state.success = false;
        state.isEmpty = true;
      })

      // add job
      .addCase(REQUEST_ADD_JOBS.pending, (state) => {
        state.pending = true;
      })
      .addCase(REQUEST_ADD_JOBS.fulfilled, (state) => {
        state.pending = false;
        state.success = true;
      })
      .addCase(REQUEST_ADD_JOBS.rejected, (state) => {
        state.pending = false;
        state.success = false;
      });
  },
});

export default jobsSlice.reducer;
