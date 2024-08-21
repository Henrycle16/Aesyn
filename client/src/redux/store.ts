import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import profileDataReducer from "./slices/profileData-slice";
import signUpReducer from "./slices/signUp-slice";
import creatorPackagesReducer from "./slices/creatorPackages-slice";
import creatorContentReducer from "./slices/creatorPortfolio-slice";
import instagramDataReducer from './slices/instagramData-slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authReducer", "profileDataReducer", "signUpReducer"],
};

const rootReducer = combineReducers({
  authReducer,
  profileDataReducer,
  signUpReducer,
  creatorPackagesReducer,
  creatorContentReducer,
  instagramDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const clearPersistedState = () => {
  persistor.purge();
};
