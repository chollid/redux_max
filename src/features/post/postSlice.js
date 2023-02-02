import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = [
  {
    posts: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
];

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5005/posts");
      console.log("response", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded, postsReceived } = postsSlice.actions;

export default postsSlice.reducer;
