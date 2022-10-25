import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/user.slice.js";

const RootReducer = combineReducers({
  user: userSlice
});

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
