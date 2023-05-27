import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Student } from '../../types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

interface types {
  currentUser?: Student;
}

const initialState: types = {};

// Write reducer get Docs
export const getCurrentStudent = createAsyncThunk(
  'student/get',
  async (userID: string) => {
    var stu: Student;
    const q = query(collection(db, 'students'), where('id', '==', userID));
    stu = (await getDocs(q)).docs[0].data() as Student;
    return stu;
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentStudent.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export default studentSlice.reducer;
