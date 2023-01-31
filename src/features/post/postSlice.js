import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", title: "First Post!", content: "Hello!" },
  { id: "1", title: "Second Post", content: "More text" },
  { id: "2", title: "Third Post", content: "Even more text" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      // prepare allows us to define the contents of the action object
      // that is dispatched.
      // This is useful for cases where we need to do some processing
      // before the action is actually dispatched
      // For example, we might need to generate a unique ID for a new post
      // before it's added to the store
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
