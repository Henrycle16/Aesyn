import { emptySplitApi } from './api';

const creatorApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getCreators: build.query<any[], void>({
      query: () => 'creators',
    }),
    getCreatorByUsername: build.query<any, string>({
      query: (username) => `creators/username/${username}`,
    }),
  }),
})

export const { useGetCreatorsQuery, useGetCreatorByUsernameQuery } = creatorApi;