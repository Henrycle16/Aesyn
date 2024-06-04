import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth-slice'
import creatorInfoReducer from './slices/creator-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        authReducer,
        creatorInfoReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector