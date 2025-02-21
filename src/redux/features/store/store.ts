import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api-slice";
import counterReducer from "../counter/counter-slice"


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
