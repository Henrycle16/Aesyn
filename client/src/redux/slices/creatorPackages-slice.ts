import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: creatorPackagesInfoReducer;
};

type Package = {
  _id?: string;
  socialMedia: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

type creatorPackagesInfoReducer = {
  packages: Package[];
  currentPackage: Package;
};

const initialState = {
  value: {
    packages: [],
    currentPackage: {
      _id: "",
      socialMedia: "",
      type: "",
      description: "",
      price: 0,
      quantity: 0,
    },
  } as creatorPackagesInfoReducer,
} as InitialState;

export const creatorPackages = createSlice({
  name: "creatorPackages",
  initialState,
  reducers: {
    creatorPackagesInfo: (
      state,
      action: PayloadAction<Partial<creatorPackagesInfoReducer>>
    ) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    editPackage: (state, action: PayloadAction<Package>) => {
      for (let i = 0; i < state.value.packages.length; i++) {
        if (state.value.packages[i]._id === action.payload._id) {
          state.value.packages[i] = action.payload;
          console.log(state.value.packages[i]);
        }
      }
    },
    addPackage: (state, action: PayloadAction<Package>) => {
      state.value.packages.push(action.payload);
    },
    resetCurrentPackage: (state) => {
      state.value.currentPackage = {
        socialMedia: "",
        type: "",
        description: "",
        price: 0,
        quantity: 0,
      };
    },
    deletePackage: (state, action: PayloadAction<Package>) => {
      state.value.packages = state.value.packages.filter(packageData => packageData._id !== action.payload._id);
    },
  },
});

export const {
  creatorPackagesInfo,
  editPackage,
  addPackage,
  resetCurrentPackage,
  deletePackage,
} = creatorPackages.actions;
export default creatorPackages.reducer;
