import { async } from '@firebase/util';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getDate, getDateString } from '../../utils';

interface StudyRoute {
  desc: string;
  name: string;
}

interface types {
  studyRoutes: StudyRoute[];
  checkedInDays: string[];
}

const initialState: types = {
  studyRoutes: [],
  checkedInDays: [],
};

// Write reducer get studyRoutes
export const getStudyRoutes = createAsyncThunk('study/getRoutes', async () => {
  var routes: StudyRoute[] = [];
  const querySnapshot = await getDocs(collection(db, 'study-route'));
  querySnapshot.forEach(async (e) => {
    routes.push(e.data() as StudyRoute);
  });

  return routes;
});

// Write reducer set check in today
export const setCheckInToday = createAsyncThunk(
  'study/setCheckIn',
  async (day: Date) => {
    // var day: Date;
    const q = query(
      collection(db, 'students'),
      where('id', '==', 'Q4hq6CKSQUXrofY2HWLsl1L7Xhn2')
    );

    const querySnapshot = (await getDocs(q)).docs[0];

    await updateDoc(querySnapshot.ref, {
      checkinDays: arrayUnion(day),
    });

    return day;
  }
);

// Write reducer get checkedInDay
// TODO: Get data of 7 days of current week
export const getCheckedInDays = createAsyncThunk(
  'study/getCheckedIn',
  async () => {
    // Get data of current user
    const q = query(
      collection(db, 'students'),
      where('id', '==', 'Q4hq6CKSQUXrofY2HWLsl1L7Xhn2')
    );

    var students: string[] = [];

    const querySnapshot = await (await getDocs(q)).docs[0].data().checkinDays;

    querySnapshot.forEach(async (e: Timestamp) => {
      students.push(getDate(e.seconds).toLocaleDateString());
    });

    return students;
  }
);

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudyRoutes.pending, (state) => {})
      .addCase(getStudyRoutes.fulfilled, (state, action) => {
        state.studyRoutes = action.payload as StudyRoute[];
      })
      .addCase(getStudyRoutes.rejected, (state, action) => {});
    builder
      .addCase(getCheckedInDays.pending, (state) => {})
      .addCase(getCheckedInDays.fulfilled, (state, action) => {
        state.checkedInDays = action.payload;
      })
      .addCase(getCheckedInDays.rejected, (state, action) => {});
    builder
      .addCase(setCheckInToday.pending, (state) => {})
      .addCase(setCheckInToday.fulfilled, (state, action) => {
        state.checkedInDays.push(action.payload.toLocaleDateString());
      })
      .addCase(setCheckInToday.rejected, (state, action) => {});
  },
});

// export const { GET_STUDY_ROUTES } = studySlice.actions;

export default studySlice.reducer;
