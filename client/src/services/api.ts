import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}/api` }),
  endpoints: () => ({}),
})