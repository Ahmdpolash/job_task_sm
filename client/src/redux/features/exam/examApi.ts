import { baseApi } from "@/redux/api/baseApi";

const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitExam: builder.mutation({
      query: (data) => ({
        url: "/exam/submit",
        method: "POST",
        body: data,
      }),
    }),
    getUserExamResults: builder.query({
      query: (userId) => `/exam/user/${userId}`,
    }),
  }),
});

export const { useSubmitExamMutation, useGetUserExamResultsQuery } = examApi;
