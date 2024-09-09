import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import profileDataReducer from "./slices/profileData-slice";
import signUpReducer from "./slices/signUp-slice";
import creatorPackagesReducer from "./slices/creatorPackages-slice";
import creatorContentReducer from "./slices/creatorPortfolio-slice";
import instagramDataReducer from "./slices/instagramData-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

// test slice
import instagramDataReducerV2 from "./slices/instagramData-sliceV2";

// RTK Query Imports
import { setupListeners } from "@reduxjs/toolkit/query";
import { emptySplitApi } from "@/services/api";

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
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  authReducer,
  profileDataReducer,
  signUpReducer,
  creatorPackagesReducer,
  creatorContentReducer,
  instagramDataReducer,

  // added test slice
  instagramDataReducerV2,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      emptySplitApi.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const clearPersistedState = () => {
  persistor.purge();
};

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

