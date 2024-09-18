import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API
const API_URL = "https://job-sheet-backend-jbvw.onrender.com/api/jobsheets";

// Fetch all jobsheets
export const fetchJobsheets = createAsyncThunk(
  "jobsheets/fetchJobsheets",
  async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  }
);

// Fetch a single jobsheet by ID
export const fetchJobsheetById = createAsyncThunk(
  "jobsheets/fetchJobsheetById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(response);
    return response.data;
  }
);

// Create a new jobsheet
export const createJobsheet = createAsyncThunk(
  "jobsheets/createJobsheet",
  async (jobsheetData) => {
    const response = await axios.post(`${API_URL}/create`, jobsheetData);
    return response.data;
  }
);

// Update a jobsheet
export const updateJobsheet = createAsyncThunk(
  "jobsheets/updateJobsheet",
  async ({ id, jobsheetData }) => {
    const response = await axios.put(`${API_URL}/${id}`, jobsheetData);
    return response.data;
  }
);

// Delete a jobsheet
export const deleteJobsheet = createAsyncThunk(
  "jobsheets/deleteJobsheet",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// Initial state
const initialState = {
  jobsheets: [],
  status: "idle",
  error: null,
};

// Jobsheet slice
const jobsheetSlice = createSlice({
  name: "jobsheets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all jobsheets
      .addCase(fetchJobsheets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobsheets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobsheets = action.payload;
      })
      .addCase(fetchJobsheets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch a single jobsheet
      .addCase(fetchJobsheetById.fulfilled, (state, action) => {
        const index = state.jobsheets.findIndex(
          (js) => js._id === action.payload._id
        );
        if (index >= 0) {
          state.jobsheets[index] = action.payload;
        } else {
          state.jobsheets.push(action.payload);
        }
      })
      // Create a new jobsheet
      .addCase(createJobsheet.fulfilled, (state, action) => {
        state.jobsheets.push(action.payload);
      })
      // Update a jobsheet
      .addCase(updateJobsheet.fulfilled, (state, action) => {
        const index = state.jobsheets.findIndex(
          (js) => js._id === action.payload._id
        );
        if (index >= 0) {
          state.jobsheets[index] = action.payload;
        }
      })
      // Delete a jobsheet
      .addCase(deleteJobsheet.fulfilled, (state, action) => {
        state.jobsheets = state.jobsheets.filter(
          (js) => js._id !== action.payload
        );
      });
  },
});

export default jobsheetSlice.reducer;
