import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const UserApi = createApi({
  reducerPath: "userDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5555/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: ({ endPoint }) => (endPoint ? endPoint : `user`),
      providesTags: ["User"],
    }),
    postUserDetail: builder.mutation({
      query: ({ endPoint, body }) => ({
        url: endPoint,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    putUserDetail: builder.mutation({
      query: ({ endPoint, body, id }) => ({
        url: `${endPoint}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUserDetail: builder.mutation({
      query: ({ endPoint, id }) => ({
        url: `${endPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetUserDetailsQuery,
  useGetUserDetailsQuery,
  usePostUserDetailMutation,
  usePutUserDetailMutation,
  useDeleteUserDetailMutation,
} = UserApi;
