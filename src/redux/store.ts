import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import studySlice from './slice/studySlice';
import adminSlice from './slice/adminSlice';
import docSlice from './slice/docSlice';
import exSlice from './slice/exSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  study: studySlice,
  admin: adminSlice,
  doc: docSlice,
  ex: exSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
