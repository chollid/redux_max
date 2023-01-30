import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    counter: counterReducer,
  },
});
