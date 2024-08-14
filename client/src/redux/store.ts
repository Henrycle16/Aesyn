import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth-slice'
import profileDataReducer from './slices/profileData-slice'
import userInfoReducer from './slices/user-slice'
import creatorPackagesReducer from './slices/creatorPackages-slice'
import creatorContentReducer from './slices/creatorPortfolio-slice'
import instagramDataReducer from './slices/instagramData-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        authReducer,
        profileDataReducer,
        userInfoReducer,
        creatorPackagesReducer,
        creatorContentReducer,
        instagramDataReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector