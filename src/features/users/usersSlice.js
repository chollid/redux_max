import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Albert Einstein" },
  { id: "1", name: "Isac Newton" },
  { id: "2", name: "Dave Gray" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export const { postAdded } = usersSlice.actions;

export default usersSlice.reducer;
