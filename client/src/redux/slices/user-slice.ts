import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    value: userInfoReducer;
}

type userInfoReducer = {
    isCreator: boolean;
    isBrand: boolean;
    email: string;
    companyName: string;
    industry: string;
    username: string;
    gender: string;
    location: string;
    lng: number;
    lat: number;
    zoom: number;
    markerLocation: [number, number] | null;
    isLocationSelected: boolean;
    preferences: string[];
    niches: string[];
    currentStep: number;
}

const initialState = {
    value: {
        isCreator: false,
        isBrand: false,
        email: "",
        companyName: "",
        industry: "",
        username: "",
        gender: "",
        location: "",
        lng: -98.5795,
        lat: 39.8283,
        zoom: 2.5,
        markerLocation: null,
        isLocationSelected: false,
        preferences: [],
        niches: [],
        currentStep: 0,
    } as userInfoReducer,
} as InitialState

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfo: (state, action: PayloadAction<Partial<userInfoReducer>>) => {
            state.value = {
                ...state.value,
                ...action.payload,
            }
        },
        setLocation: (state, action: PayloadAction<string>) => {
            state.value.location = action.payload;
        },
        setLng: (state, action: PayloadAction<number>) => {
            state.value.lng = action.payload;
        },
        setLat: (state, action: PayloadAction<number>) => {
            state.value.lat = action.payload;
        },
        setZoom: (state, action: PayloadAction<number>) => {
            state.value.zoom = action.payload;
        },
        setMarkerLocation: (state, action: PayloadAction<[number, number] | null>) => {
            state.value.markerLocation = action.payload;
        },
        setIsLocationSelected: (state, action: PayloadAction<boolean>) => {
            state.value.isLocationSelected = action.payload;
        },
        addNiche: (state, action: PayloadAction<string>) => {
            if (state.value.niches.length < 6) {
                state.value.niches.push(action.payload);
            }
        },
        removeNiche: (state, action: PayloadAction<string>) => {
            state.value.niches = state.value.niches.filter(niche => niche !== action.payload);
        },
        addPref: (state, action: PayloadAction<string>) => {
            state.value.preferences.push(action.payload);
        },
        removePref: (state, action: PayloadAction<string>) => {
            state.value.preferences = state.value.preferences.filter(preferences => preferences !== action.payload);
        },
    },
})

export const {userInfo, setLocation, setLng, setLat, setZoom, setMarkerLocation, setIsLocationSelected, addNiche, removeNiche, addPref, removePref} = user.actions
export default user.reducer