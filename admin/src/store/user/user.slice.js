import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthorized: false
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.user = action.payload;
    },

    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload;
    }
  }
});

export const UserActions = { ...UserSlice.actions };

export default UserSlice.reducer;
