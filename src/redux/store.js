import { configureStore } from "@reduxjs/toolkit";
import jobsheetReducer from "./jobsheetslice";

const store = configureStore({
  reducer: {
    jobsheets: jobsheetReducer,
  },
});

export default store;
