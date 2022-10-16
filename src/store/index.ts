import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    blogReducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
