import { emptySplitApi } from './api';

const userApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query<any, string>({
      query: (id) => `users/${id}`,
    }),
  }),
})

export const { useGetUserByIdQuery } = userApi;