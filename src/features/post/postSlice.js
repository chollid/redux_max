import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", title: "First Post!", content: "Hello!" },
  { id: "1", title: "Second Post", content: "More text" },
  { id: "2", title: "Third Post", content: "Even more text" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
