import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getDate } from '../../utils';
import { StudyRoute } from '../../types';

interface types {
  studyRoutes: StudyRoute[];
  checkedInDays: string[];
  currentRoute: StudyRoute | null;
}

const initialState: types = {
  studyRoutes: [],
  checkedInDays: [],
  currentRoute: null,
};

// Write reducer get studyRoutes
export const getStudyRoutes = createAsyncThunk('study/getRoutes', async () => {
  var routes: StudyRoute[] = [];
  const querySnapshot = await getDocs(
    collection(db, 'study_paths', 'j7EL4b607cyt0QV5NlRB', 'study_routes') // static
  );
  querySnapshot.forEach(async (e) => {
    routes.push(e.data() as StudyRoute);
  });

  return routes;
});

// Write reducer get detail studyRoutes
export const getStudyRoute = createAsyncThunk(
  'study/getRoute',
  async (routeID: string) => {
    const docRef = await getDoc(
      doc(db, 'study_paths', 'j7EL4b607cyt0QV5NlRB', 'study_routes', routeID) // static
    );

    console.log(docRef.data);
    return docRef.data as StudyRoute;
  }
);

// Write reducer set check in today
export const setCheckInToday = createAsyncThunk(
  'study/setCheckIn',
  async (data: { day: Date; userID: string }) => {
    console.log(data);
    const q = query(collection(db, 'students'), where('id', '==', data.userID));
    const querySnapshot = (await getDocs(q)).docs[0];

    console.log('userID: ' + data.userID);
    console.log(querySnapshot);

    if (querySnapshot) {
      await updateDoc(querySnapshot.ref, {
        checkinDays: arrayUnion(data.day),
      });
    } else {
      await addDoc(collection(db, 'students'), {
        id: data.userID,
        checkinDays: [data.day],
      });
    }

    return data.day;
  }
);

// Write reducer get checkedInDay
// TODO: Get data of 7 days of current week
export const getCheckedInDays = createAsyncThunk(
  'study/getCheckedIn',
  async (userID: string) => {
    // Get data of current user
    const q = query(collection(db, 'students'), where('id', '==', userID));

    var days: string[] = [];

    const querySnapshot = await (await getDocs(q)).docs[0].data().checkinDays;

    querySnapshot.forEach(async (e: Timestamp) => {
      days.push(getDate(e.seconds).toLocaleDateString());
    });

    return days;
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
    builder.addCase(getStudyRoute.fulfilled, (state, action) => {
      state.currentRoute = action.payload;
    });
  },
});

// export const { GET_STUDY_ROUTES } = studySlice.actions;

export default studySlice.reducer;
