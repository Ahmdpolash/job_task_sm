import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      // set the user and token to reduxt state
      //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //     try {
      //       const result = await queryFulfilled;
      //       dispatch(
      //         loggedUser({
      //           accessToken: result.data.data.accessToken,
      //           user: result.data.data.user,
      //         })
      //       );
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   },
    }),

    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/auth/verifyOtp",
        method: "POST",
        body: otpData,
      }),
      transformErrorResponse: (response: any) => {
        // extract backend error message
        return response.data.message || response.statusText;
      },
    }),

    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
    }),

    GetTotalCounts: builder.query({
      query: () => ({
        url: "/auth/totalCounts",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogOutMutation,
  useGetAllUsersQuery,
  useGetTotalCountsQuery,
} = userApi;
