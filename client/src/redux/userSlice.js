import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  userId: "",
  email: "",
  picture: "",
  token: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    userLoggedOut: (state) => {
      state.name = "";
      state.userId = "";
      state.email = "";
      state.picture = "";
      state.token = "";
      state.isAdmin = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;
