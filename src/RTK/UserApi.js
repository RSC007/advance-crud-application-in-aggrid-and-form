import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const UserApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5555/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => `user`,
      providesTags: ["User"],
    }),
    postUserDetail: builder.mutation({
      query: (detail) => ({
        url: "user",
        method: "POST",
        body: detail,
      }),
      invalidatesTags: ["User"],
    }),
    putUserDetail: builder.mutation({
      query: (detail) => ({
        url: `user/${detail.id}`,
        method: "PUT",
        body: detail,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUserDetail: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserDetailsQuery,
  usePostUserDetailMutation,
  usePutUserDetailMutation,
  useDeleteUserDetailMutation,
} = UserApi;
