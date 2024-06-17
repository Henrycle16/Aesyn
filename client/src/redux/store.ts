import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth-slice'
import userInfoReducer from './slices/user-slice'
import creatorPackagesReducer from './slices/creatorPackages-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        authReducer,
        userInfoReducer,
        creatorPackagesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector