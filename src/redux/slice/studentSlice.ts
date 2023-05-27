import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Student } from '../../types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getDate } from '../../utils';

interface types {
  currentUser?: Student;
}

const initialState: types = {};

// Write reducer get Doc
export const getCurrentStudent = createAsyncThunk(
  'student/get',
  async (userID: string) => {
    var stu: Student;
    const q = query(collection(db, 'students'), where('id', '==', userID));
    const querySnapshot = (await getDocs(q)).docs[0];
    stu = querySnapshot.data() as Student;

    if (querySnapshot.data().birthday)
      stu.birthday = getDate(querySnapshot.data().birthday.seconds);

    return stu;
  }
);

export const updateCurrentStudent = createAsyncThunk(
  'student/update',
  async ({ data, oldData }: { data: Student; oldData: Student }) => {
    const q = query(collection(db, 'students'), where('id', '==', data.id));
    const querySnapshot = (await getDocs(q)).docs[0];

    await updateDoc(querySnapshot.ref, {
      name: data.name ? data.name : oldData.name,
      email: data.email ? data.email : oldData.email,
      birthday: data.birthday ? data.birthday : oldData.birthday,
      gender: data.gender ? data.gender : oldData.gender,
      bio: data.bio ? data.bio : oldData.bio,
    });

    return data;
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
