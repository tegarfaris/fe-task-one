import { createAsyncThunk } from "@reduxjs/toolkit";

export const REQUEST_GET_LIST_JOB = createAsyncThunk(
  "jobs/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://0fbc5627ec15.ngrok-free.app/api/job-types",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const REQUEST_ADD_JOBS = createAsyncThunk(
  "jobs/add-job",
  async (newJob, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://0fbc5627ec15.ngrok-free.app/api/job-types",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(newJob),
        }
      );
      return res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
