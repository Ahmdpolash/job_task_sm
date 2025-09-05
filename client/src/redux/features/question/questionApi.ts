import { baseApi } from "@/redux/api/baseApi";

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getQuestions: builder.query({
      query: () => ({
        url: "/question",
        method: "GET",
      }),
    }),

    getQuestionByStep: builder.query({
      query: (step: number) => ({
        url: `/question/step/${step}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useGetQuestionByStepQuery } = questionApi;
