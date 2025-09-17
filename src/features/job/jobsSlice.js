import { createSlice } from "@reduxjs/toolkit";
import {
  REQUEST_DELETE_JOB,
  REQUEST_DETAIL_JOB,
  REQUEST_GET_LIST_JOB,
  REQUEST_UPDATE_JOB,
} from "./actions";
import { REQUEST_ADD_JOBS } from "./actions";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobList: [],
    detailJob: null,
    pending: false,
    success: false,
    isEmpty: false,
    refetch: null,
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
        state.isEmpty = action.payload.length === 0;
      })
      .addCase(REQUEST_GET_LIST_JOB.rejected, (state) => {
        state.pending = false;
        state.success = false;
        state.isEmpty = true;
      })

      // detail job
      .addCase(REQUEST_DETAIL_JOB.pending, (state) => {
        state.pending = true;
        state.success = false;
      })
      .addCase(REQUEST_DETAIL_JOB.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
        state.detailJob = action.payload;
        state.isEmpty = action.payload.length === 0;
      })
      .addCase(REQUEST_DETAIL_JOB.rejected, (state) => {
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
      })

      //delete job
      .addCase(REQUEST_DELETE_JOB.pending, (state) => {
        state.pending = true;
        state.refetch = false;
      })
      .addCase(REQUEST_DELETE_JOB.fulfilled, (state) => {
        state.pending = false;
        state.success = true;
        state.refetch = true;
      })
      .addCase(REQUEST_DELETE_JOB.rejected, (state) => {
        state.pending = false;
        state.success = false;
        state.refetch = false;
      })

      // update job
      .addCase(REQUEST_UPDATE_JOB.pending, (state) => {
        state.pending = true;
      })
      .addCase(REQUEST_UPDATE_JOB.fulfilled, (state) => {
        state.pending = false;
        state.success = true;
      })
      .addCase(REQUEST_UPDATE_JOB.rejected, (state) => {
        state.pending = false;
        state.success = false;
      });
  },
});

export default jobsSlice.reducer;
