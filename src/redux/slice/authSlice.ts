import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { RootState } from '../store';
import { stat } from 'fs';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
  userRole: null || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, userID, userRole } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
      state.userRole = userRole;
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      state.userRole = null || '';
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserID = (state: RootState) => state.auth.userID;
export const selectUserRole = (state: RootState) => state.auth.userRole;

export default authSlice.reducer;
