import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: creatorProfileInfoReducer;
};

type creatorProfileInfoReducer = {
  previousModalId: string;
  userName: string;
  location: {
    city: string,
    state: string,
    country: string
  };
  gender: string;
  preferences: string[];
  interests: string[];
};

const initialState = {
  value: {
    previousModalId: "",
    userName: "",
    location: {
      city: "",
      state: "",
      country: ""
    },
    gender: "",
    preferences: [],
    interests: []
  } as creatorProfileInfoReducer,
} as InitialState;

export const creatorProfile = createSlice({
  name: "creatorProfile",
  initialState,
  reducers: {
    creatorProfileInfo: (state, action: PayloadAction<Partial<creatorProfileInfoReducer>>) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
  },
});

export const { creatorProfileInfo } = creatorProfile.actions;
export default creatorProfile.reducer;
