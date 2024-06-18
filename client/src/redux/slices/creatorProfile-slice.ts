import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: creatorProfileInfoReducer;
};

type creatorProfileInfoReducer = {
  previousModalId: string;
};

const initialState = {
  value: {
    previousModalId: "",
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
