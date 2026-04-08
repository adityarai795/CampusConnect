import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import resourceReducer from "./reducers/resourceReducer";
import jobReducer from "./reducers/jobReducer";
import resultReducer from "./reducers/resultReducer";
import communityReducer from "./reducers/communityReducer";
import problemReducer from "./reducers/problemReducer";
import userReducer from "./reducers/userReducer";
import teacherReducer from "./reducers/teacherReducer";
import organizationReducer from "./reducers/organizationReducer";
import marketplaceReducer from "./reducers/marketplaceReducer";
import roadmapReducer from "./reducers/roadmapReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  resources: resourceReducer,
  jobs: jobReducer,
  results: resultReducer,
  community: communityReducer,
  problems: problemReducer,
  users: userReducer,
  teachers: teacherReducer,
  organizations: organizationReducer,
  marketplace: marketplaceReducer,
  roadmaps: roadmapReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
