import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: profileDataReducer;
};

type profileDataReducer = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  preferences: string[];
  interests: string[];
  avatar: string;
  previousModalId: string;
  communicationEmail: boolean;
  marketingEmail: boolean;
  messageEmail: boolean;
  securityEmail: boolean;
};

const initialState = {
  value: {
    userId: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    bio: "",
    preferences: [],
    interests: [],
    avatar: "",
    communicationEmail: false,
    marketingEmail: false,
    messageEmail: false,
    securityEmail: false,
    previousModalId: "",
  } as profileDataReducer,
} as InitialState;

export const profileData = createSlice({
  name: "profileData",
  initialState,
  reducers: {
    profileDataInfo: (
      state,
      action: PayloadAction<Partial<profileDataReducer>>
    ) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    resetProfileData: () => {
      initialState;
    },
  },
});

export const { profileDataInfo, resetProfileData } = profileData.actions;
export default profileData.reducer;
