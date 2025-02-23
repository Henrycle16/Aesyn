import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    name: string;
    email: string;
    userId: string;
    creatorUsername: string;
    creatorId: string;
    brandId: string;
}

const initialState = {
    value: {
        isAuth: false,
        name: "",
        email: "",
        userId: "",
        creatorUsername: "",
        creatorId: "",
        brandId: ""
    } as AuthState,
} as InitialState

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      initialState;
    },
    logIn: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
  },
});

export const {logIn, logOut} = auth.actions
export default auth.reducer