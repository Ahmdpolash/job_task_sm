import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagType";

export const baseApi = createApi({
  reducerPath: "baseApi",

  tagTypes: tagTypesList,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://smtaskserver.vercel.app/api/v1",
    // baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
