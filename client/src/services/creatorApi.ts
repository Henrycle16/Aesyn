import { emptySplitApi } from './api';

const creatorApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getCreators: build.query<any[], void>({
      query: () => 'creators',
    }),
  }),
})

export const { useGetCreatorsQuery } = creatorApi;