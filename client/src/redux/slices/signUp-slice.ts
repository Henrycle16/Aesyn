import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    value: signUpReducer;
}

type signUpReducer = {
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
    interests: string[];
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
        lat: 37.8283,
        zoom: 2.4,
        markerLocation: null,
        isLocationSelected: false,
        preferences: [],
        interests: [],
        currentStep: 0,
    } as signUpReducer,
} as InitialState

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfo: (state, action: PayloadAction<Partial<signUpReducer>>) => {
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
        addInterest: (state, action: PayloadAction<string>) => {
            if (state.value.interests.length < 6) {
                state.value.interests.push(action.payload);
            }
        },
        removeInterest: (state, action: PayloadAction<string>) => {
            state.value.interests = state.value.interests.filter(interest => interest !== action.payload);
        },
        addPref: (state, action: PayloadAction<string>) => {
            state.value.preferences.push(action.payload);
        },
        removePref: (state, action: PayloadAction<string>) => {
            state.value.preferences = state.value.preferences.filter(preferences => preferences !== action.payload);
        },
        resetSignUp: (state) => {
            state.value = {
                isCreator: false,
                isBrand: false,
                email: "",
                companyName: "",
                industry: "",
                username: "",
                gender: "",
                location: "",
                lng: -98.5795,
                lat: 37.8283,
                zoom: 2.4,
                markerLocation: null,
                isLocationSelected: false,
                preferences: [],
                interests: [],
                currentStep: 0,
            }
        },
    },
})

export const {userInfo, setLocation, setLng, setLat, setZoom, setMarkerLocation, setIsLocationSelected, addInterest, removeInterest, addPref, removePref, resetSignUp} = user.actions
export default user.reducer