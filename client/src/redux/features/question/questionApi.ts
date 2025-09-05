import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagType";

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getQuestions: builder.query({
      query: () => ({
        url: "/question",
        method: "GET",
      }),
      providesTags: [tagTypes.question],
    }),

    getQuestionByStep: builder.query({
      query: (step: number) => ({
        url: `/question/step/${step}`,
        method: "GET",
      }),
    }),

    deleteQuestion: builder.mutation({
      query: (id: string) => ({
        url: `/question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.question],
    }),

    updateQuestion: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/question/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    addQuestion: builder.mutation({
      query: (data: any) => ({
        url: "/question",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.question],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionByStepQuery,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
  useAddQuestionMutation,
} = questionApi;
