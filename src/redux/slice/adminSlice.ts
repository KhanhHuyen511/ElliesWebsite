import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { StudyPath } from '../../types';

interface types {
  listStudyPaths: StudyPath[];
  // list user
  // list doc
  // list ...
}

const initialState: types = {
  listStudyPaths: [],
};

// Write reducer get studyRoutes
export const getStudyPaths = createAsyncThunk(
  'admin/study/getPath',
  async () => {
    var paths: StudyPath[] = [];
    const querySnapshot = await getDocs(collection(db, 'study_paths'));
    querySnapshot.forEach(async (e) => {
      var item: StudyPath = e.data();
      item.id = e.id;
      paths.push(item);
    });

    return paths;
  }
);

// Write reducer get studyRoutes
export const setStudyPath = createAsyncThunk(
  'admin/study/setPath',
  async (data: StudyPath) => {
    const docRef = await addDoc(collection(db, 'study_paths'), {
      name: data.name,
      topic: data.topic,
      level: data.level,
    });

    data.id = docRef.id;

    return data;
  }
);

const adminSlice = createSlice({
  name: 'admin_study',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getStudyPaths.fulfilled, (state, action) => {
      state.listStudyPaths = action.payload as StudyPath[];
    });
    builder.addCase(setStudyPath.fulfilled, (state, action) => {
      state.listStudyPaths.push(action.payload);
      console.log(action.payload);
    });
  },
});

export default adminSlice.reducer;
