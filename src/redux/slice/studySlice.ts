import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { getDate } from "../../utils";
import {
  LevelType,
  Student,
  StudyCard,
  StudyPath,
  StudyRoute,
} from "../../types";

interface types {
  studyRoutes: StudyRoute[];
  checkedInDays: string[];
  currentPathId?: string;
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
export const getStudyRoutes = createAsyncThunk(
  "study/getRoutes",
  async (userID: string) => {
    const q = query(collection(db, "students"), where("id", "==", userID));
    const user = (await getDocs(q)).docs[0].data() as Student;

    if (user.currentPathId) {
      var routes: StudyRoute[] = [];
      const querySnapshot = await getDocs(
        collection(db, "study_paths", user.currentPathId, "study_routes")
      );
      querySnapshot.forEach(async (e) => {
        var route: StudyRoute = e.data() as StudyRoute;
        route.id = e.id;
        routes.push(route);
      });

      return routes;
    }
  }
);

export const getStudiedRoutes = createAsyncThunk(
  "study/getStudiedRoutes",
  async (userID: string) => {
    // Get data of current user
    const q = query(collection(db, "students"), where("id", "==", userID));
    const querySnapshot = (await getDocs(q)).docs[0];
    const user = (await getDocs(q)).docs[0].data() as Student;

    var studied: string[] = [];

    const queryS = user.routes as string[];
    if (queryS) studied = queryS;

    // check last item
    let levelVN = "";

    switch (user.level) {
      case LevelType.Beginner:
        levelVN = "Sơ cấp";
        break;
      case LevelType.Intermediate:
        levelVN = "Trung cấp";
        break;
      case LevelType.Advanced:
        levelVN = "Nâng cao";
        break;
      default:
        break;
    }

    const q1 = query(
      collection(db, "study_paths"),
      where("level", "==", levelVN)
    );

    if (q1 && queryS) {
      // all path in level
      const querySnapshots = (await getDocs(q1)).docs;

      // all routes in current path
      if (user.currentPathId) {
        const curPath = (
          await getDocs(
            collection(db, "study_paths", user.currentPathId, "study_routes")
          )
        ).docs;

        let listRoutes = curPath.map((e) => e.id);

        // Complete a Path -> transform to next Path
        if (studied[studied.length - 1] === listRoutes[listRoutes.length - 1]) {
          // get index of cur Path in list Path
          let listPaths = querySnapshots.map((e) => e.id);
          let curIndex = listPaths.indexOf(user.currentPathId);

          if (curIndex < listPaths.length - 1) {
            await updateDoc(querySnapshot.ref, {
              currentPathId: listPaths[curIndex + 1],
            });
          }
        }
      }
    }

    return studied;
  }
);

// Set Study Path fot Student
export const setStudyPathForStudent = createAsyncThunk(
  "study/setPathForStudent",
  async (data: { userID: string; level: LevelType }) => {
    const q = query(collection(db, "students"), where("id", "==", data.userID));
    const querySnapshot = (await getDocs(q)).docs[0];

    if (querySnapshot) {
      let levelVN = "";

      switch (data.level) {
        case LevelType.Beginner:
          levelVN = "Sơ cấp";
          break;
        case LevelType.Intermediate:
          levelVN = "Trung cấp";
          break;
        case LevelType.Advanced:
          levelVN = "Nâng cao";
          break;
        default:
          break;
      }

      const q1 = query(
        collection(db, "study_paths"),
        where("level", "==", levelVN)
      );
      const querySnapshots = (await getDocs(q1)).docs[0];

      await updateDoc(querySnapshot.ref, {
        level: data.level,
        currentPathId: querySnapshots.id,
      });
    }
  }
);

// Write reducer set check in today
export const setCheckInToday = createAsyncThunk(
  "study/setCheckIn",
  async (data: { day: Date; userID: string }) => {
    const q = query(collection(db, "students"), where("id", "==", data.userID));
    const querySnapshot = (await getDocs(q)).docs[0];

    if (querySnapshot) {
      await updateDoc(querySnapshot.ref, {
        checkinDays: arrayUnion(data.day),
      });
    } else {
      await addDoc(collection(db, "students"), {
        id: data.userID,
        checkinDays: [data.day],
      });
    }

    return data.day;
  }
);

// Write reducer get detail studyRoutes
export const getStudyRoute = createAsyncThunk(
  "study/getRoute",
  async ({ routeID, userID }: { routeID: string; userID: string }) => {
    // Get data of current user
    const q = query(collection(db, "students"), where("id", "==", userID));
    const user = (await getDocs(q)).docs[0].data() as Student;

    if (user.currentPathId) {
      var route: StudyRoute = {};

      const docRef = await getDoc(
        doc(db, "study_paths", user.currentPathId, "study_routes", routeID)
      );

      // convert docRef as StudyRoute get error
      route = docRef.data() as StudyRoute;
      route.id = docRef.id;

      return route;
    }
  }
);

// Write reducer get checkedInDay
// TODO: Get data of 7 days of current week
export const getCheckedInDays = createAsyncThunk(
  "study/getCheckedIn",
  async (userID: string) => {
    // Get data of current user
    const q = query(collection(db, "students"), where("id", "==", userID));

    var days: string[] = [];

    const querySnapshot = await (await getDocs(q)).docs[0].data().checkinDays;

    querySnapshot.forEach(async (e: Timestamp) => {
      days.push(getDate(e.seconds).toLocaleDateString());
    });

    return days;
  }
);

export const getStudyCards = createAsyncThunk(
  "study/getStudyCards",
  async ({ routeID, userID }: { routeID: string; userID: string }) => {
    // Get data of current user
    const q = query(collection(db, "students"), where("id", "==", userID));
    const user = (await getDocs(q)).docs[0].data() as Student;

    if (user.currentPathId) {
      var route: StudyRoute = {};

      const docRef = await getDoc(
        doc(db, "study_paths", user.currentPathId, "study_routes", routeID)
      );

      // convert docRef as StudyRoute get error
      route = docRef.data() as StudyRoute;
      route.id = docRef.id;

      if (route.cards)
        await Promise.all(
          route?.cards?.map(async (item) => {
            let snapshot = await getDoc(doc(db, "vocabs", item));
            if (snapshot.data() === undefined)
              snapshot = await getDoc(doc(db, "sentences", item));
            let card = snapshot.data() as StudyCard;
            card.id = snapshot.id;
            if (route.vocabs) route.vocabs = [card, ...route.vocabs];
            else route.vocabs = [card];
          })
        );

      return route.vocabs;
    }
  }
);

//
export const setStudyRouteState = createAsyncThunk(
  "study/setRouteState",
  async (data: { routeID: string; userID: string }) => {
    const q = query(collection(db, "students"), where("id", "==", data.userID));
    const querySnapshot = (await getDocs(q)).docs[0];

    if (querySnapshot) {
      await updateDoc(querySnapshot.ref, {
        routes: arrayUnion(data.routeID),
      });
    } else {
      await addDoc(collection(db, "students"), {
        id: data.userID,
        routes: [data.routeID],
      });
    }

    return data.routeID;
  }
);

const studySlice = createSlice({
  name: "study",
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
      state.currentRoute = action.payload as StudyRoute;
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
