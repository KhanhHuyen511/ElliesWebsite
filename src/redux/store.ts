import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import studySlice from './slice/studySlice';
import adminSlice from './slice/adminSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  study: studySlice,
  admin: adminSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
