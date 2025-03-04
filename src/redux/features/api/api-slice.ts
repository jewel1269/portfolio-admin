import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URI from "../../../auth/constant/constant";




const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URI, 
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/api/books",
    }),
    findUser: builder.query({
      query: (userId) => `/api/admin/${userId}`,
    }),
  }),
});

export const { useGetBooksQuery, useFindUserQuery } = apiSlice;
