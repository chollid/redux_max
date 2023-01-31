import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/post/postSlice";
import usersReducers from "../features/post/usersSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // counter: counterReducer,
    posts: postsReducer,
    users: usersReducers,
  },
});
