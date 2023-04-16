import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Collection } from 'typescript';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log('hi');
      const { email, userName, userID, userRole } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      console.log(state.isLoggedIn);
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectLoggedIn = (state: any) => state.action.isLoggedIn;
export const selectEmail = (state: any) => state.action.email;
export const selectUserName = (state: any) => state.action.userName;
export const selectUserID = (state: any) => state.action.userID;
export const selectUserRole = (state: any) => state.action.userRole;

export default authSlice.reducer;
