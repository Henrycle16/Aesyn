import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const packagesData = [
  {
    packageId: 0,
    socialMedia: "Instagram",
    type: "Reel Post",
    description: "15 sec video post",
    price: 100,
    quantity: 1,
  },
  {
    packageId: 1,
    socialMedia: "Instagram",
    type: "Photo Post",
    description: "Single photo post",
    price: 50,
    quantity: 1,
  },
  {
    packageId: 2,
    socialMedia: "Instagram",
    type: "Multi-Photo Post",
    description: "3 photo post",
    price: 125,
    quantity: 3,
  },
];

type InitialState = {
  value: creatorPackagesInfoReducer;
};

type Package = {
  packageId?: number;
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
    packages: packagesData,
    currentPackage: {
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
        if (state.value.packages[i].packageId === action.payload.packageId) {
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
        packageId: state.value.packages.length,
        socialMedia: "",
        type: "",
        description: "",
        price: 0,
        quantity: 0,
      };
    },
    /* 
    ! Use this resetCurrentPackage instead of the one above once we start pulling data from the backend
    resetCurrentPackage: (state) => {
      state.value.currentPackage = {
        socialMedia: "",
        type: "",
        description: "",
        price: 0,
        quantity: 0,
        };
        },
        */
    deletePackage: (state, action: PayloadAction<Package>) => {
      state.value.packages = state.value.packages.filter(packageData => packageData.packageId !== action.payload.packageId);
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
