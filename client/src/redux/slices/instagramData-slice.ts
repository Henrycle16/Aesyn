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
  followersCount: number;
  followersTopCities: { [city: string]: number };
  followersAge: { [age: string]: number };
  followersGender: { [gender: string]: number };
  monthlyImpressions: number;
  monthlyReach: number;
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
    followersCount: 0,
    followersTopCities: {},
    followersAge: {},
    followersGender: {},
    monthlyImpressions: 0,
    monthlyReach: 0,
    socialMedia: "Instagram",
  } as instagramDataReducer,
} as InitialState;

export const instagramData = createSlice({
  name: "instagramData",
  initialState,
  reducers: {
    instagramDataInfo: (
      state,
      action: PayloadAction<Partial<instagramDataReducer>>
    ) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    resetInstagramData: (state) => {
      state.value = { ...initialState.value }; // Ensure a new object is created
    },
  },
});

export const { instagramDataInfo, resetInstagramData } = instagramData.actions;
export default instagramData.reducer;
