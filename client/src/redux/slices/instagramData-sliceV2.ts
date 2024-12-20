import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: instagramDataReducer;
};

type instagramDataReducer = {
  _id: string;
  creatorId: string;
  pageId: string;
  businessId: string;
  longLivedAccessToken: string;
  username: string;
  profilePictureURL: string;
  mediaCount: number;
  likeCount: number;
  commentCount: number;
  followersCount: number;
  followersTopCities: { [city: string]: number };
  followersAge: { [age: string]: number };
  followersGender: { [gender: string]: number };
  dailyMetrics: [{ date: Date; impression: number; reach: number }];
  recentPosts: {
    media_url: string;
    caption: string;
    media_type: string;
    comments_count: number;
    like_count: number;
    timestamp: string;
    id: string;
  }[];
  socialMedia: string;
};

const initialState = {
  value: {
    _id: "",
    creatorId: "",
    pageId: "",
    businessId: "",
    longLivedAccessToken: "",
    username: "",
    profilePictureURL: "",
    mediaCount: 0,
    likeCount: 0,
    commentCount: 0,
    followersCount: 0,
    followersTopCities: {},
    followersAge: {},
    followersGender: {},
    dailyMetrics: [{}],
    recentPosts: [{}],
    socialMedia: "Instagram",
  } as instagramDataReducer,
} as InitialState;

export const instagramDataV2 = createSlice({
  name: "instagramData",
  initialState,
  reducers: {
    instagramDataInfoV2: (
      state,
      action: PayloadAction<Partial<instagramDataReducer>>,
    ) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    resetInstagramDataV2: (state) => {
      state.value = { ...initialState.value };
    },
  },
});

export const { instagramDataInfoV2, resetInstagramDataV2 } =
  instagramDataV2.actions;
export default instagramDataV2.reducer;
