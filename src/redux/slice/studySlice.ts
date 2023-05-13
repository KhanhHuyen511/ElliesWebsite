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
import { StudyCard, StudyRoute } from '../../types';

interface types {
  studyRoutes: StudyRoute[];
  checkedInDays: string[];
  currentRoute: StudyRoute;
  studiedRouteIDs: string[];
}

const initialState: types = {
  studyRoutes: [],
  checkedInDays: [],
  currentRoute: {},
  studiedRouteIDs: [],
};

// Write reducer get studyRoutes
export const getStudyRoutes = createAsyncThunk('study/getRoutes', async () => {
  var routes: StudyRoute[] = [];
  const querySnapshot = await getDocs(
    collection(db, 'study_paths', 'j7EL4b607cyt0QV5NlRB', 'study_routes') // static
  );
  querySnapshot.forEach(async (e) => {
    var route: StudyRoute = e.data() as StudyRoute;
    route.id = e.id;
    routes.push(route);
  });

  return routes;
});

export const getStudiedRoutes = createAsyncThunk(
  'study/getStudiedRoutes',
  async (userID: string) => {
    // Get data of current user
    const q = query(collection(db, 'students'), where('id', '==', userID));

    var studied: string[] = [];

    const queryS = await (await getDocs(q)).docs[0].data().routes;
    queryS.forEach(async (e: string) => {
      studied.push(e);
    });

    return studied;
  }
);

// Write reducer get detail studyRoutes
export const getStudyRoute = createAsyncThunk(
  'study/getRoute',
  async (routeID: string) => {
    var route: StudyRoute = {};

    const docRef = await getDoc(
      doc(db, 'study_paths', 'j7EL4b607cyt0QV5NlRB', 'study_routes', routeID) // static
    );

    // convert docRef as StudyRoute get error
    route = docRef.data() as StudyRoute;
    route.id = docRef.id;

    return route;
  }
);

// Write reducer set check in today
export const setCheckInToday = createAsyncThunk(
  'study/setCheckIn',
  async (data: { day: Date; userID: string }) => {
    console.log(data);
    const q = query(collection(db, 'students'), where('id', '==', data.userID));
    const querySnapshot = (await getDocs(q)).docs[0];

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

export const getStudyCards = createAsyncThunk(
  'study/getStudyCards',
  async (routeID: string) => {
    // Get data of current user

    const cards: StudyCard[] = [];

    const querySnapshot = await getDocs(
      collection(
        db,
        'study_paths',
        'j7EL4b607cyt0QV5NlRB',
        'study_routes',
        routeID,
        'vocabs'
      ) // static
    );
    querySnapshot.forEach(async (e) => {
      var card: StudyCard = e.data() as StudyCard;
      card.id = e.id;
      cards.push(card);
    });

    return cards;
  }
);

//
export const setStudyRouteState = createAsyncThunk(
  'study/setRouteState',
  async (data: { routeID: string; userID: string }) => {
    console.log(data);
    const q = query(collection(db, 'students'), where('id', '==', data.userID));
    const querySnapshot = (await getDocs(q)).docs[0];

    if (querySnapshot) {
      await updateDoc(querySnapshot.ref, {
        routes: arrayUnion(data.routeID),
      });
    } else {
      await addDoc(collection(db, 'students'), {
        id: data.userID,
        routes: [data.routeID],
      });
    }

    return data.routeID;
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
    builder.addCase(getStudiedRoutes.fulfilled, (state, action) => {
      state.studiedRouteIDs = action.payload;
    });
    builder.addCase(setStudyRouteState.fulfilled, (state, action) => {
      state.studiedRouteIDs.push(action.payload);
    });
  },
});

export default studySlice.reducer;
