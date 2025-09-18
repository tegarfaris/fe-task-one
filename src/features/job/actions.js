import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const REQUEST_RESET_JOBS = createAction("jobs/reset");
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

      const data = await res.json();

      if (!res.ok) {
        alert("CODE must be unique");
        return rejectWithValue(data);
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Unexpected error");
    }
  }
);

export const REQUEST_DELETE_JOB = createAsyncThunk(
  "jobs/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://0fbc5627ec15.ngrok-free.app/api/job-types/${id}`,
        {
          method: "DELETE",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const REQUEST_UPDATE_JOB = createAsyncThunk(
  "jobs/update",
  async (updateJob, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://0fbc5627ec15.ngrok-free.app/api/job-types/${updateJob.pjobTypeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(updateJob),
        }
      );

      if (!res.ok) {
        alert("CODE must be unique");
        return rejectWithValue(res.json());
      }
      return res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const REQUEST_DETAIL_JOB = createAsyncThunk(
  "jobs/detail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://0fbc5627ec15.ngrok-free.app/api/job-types/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      return res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
