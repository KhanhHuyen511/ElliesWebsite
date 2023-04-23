import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { StudyCard, StudyPath, StudyRoute } from '../../types';

interface types {
  listStudyPaths: StudyPath[];
  currentStudyPath: StudyPath;
  currentStudyRoute: StudyCard;
  // list user
  // list doc
  // list ...
}

const initialState: types = {
  listStudyPaths: [],
  currentStudyPath: {},
  currentStudyRoute: {},
};

// Write reducer get studyRoutes
export const getStudyPaths = createAsyncThunk(
  'admin/study/getPaths',
  async () => {
    var paths: StudyPath[] = [];
    const querySnapshot = await getDocs(collection(db, 'study_paths'));
    querySnapshot.forEach(async (e) => {
      var item: StudyPath = e.data() as StudyPath;
      item.id = e.id;
      paths.push(item);
    });

    return paths;
  }
);

// Write reducer get studyRoutes
export const getStudyPath = createAsyncThunk(
  'admin/study/getPath',
  async (id: string) => {
    var path: StudyPath;
    const docRef = await getDoc(doc(db, 'study_paths', id));
    path = docRef.data() as StudyPath;

    const routeRef = await getDocs(
      collection(db, 'study_paths', id, 'study_routes')
    );
    path.studyRoutes = routeRef.docs.map(
      (d) => ({ id: d.id, ...d.data() } as StudyRoute)
    );

    return path;
  }
);

export const getStudyRoute = createAsyncThunk(
  'admin/study/getRoute',
  async (data: { path_id: string; id: string }) => {
    var route: StudyRoute;

    const docRef = await getDoc(
      doc(db, 'study_paths', data.path_id, 'study_routes', data.id)
    );
    route = docRef.data() as StudyRoute;

    const cardRef = await getDocs(
      collection(
        db,
        'study_paths',
        data.path_id,
        'study_routes',
        data.id,
        'vocabs'
      )
    );

    route.vocabs = cardRef.docs.map(
      (d) => ({ id: d.id, ...d.data() } as StudyCard)
    );

    return route;
  }
);

// Write reducer set studyPath
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

// Write reducer set studyRoute
export const setStudyRoute = createAsyncThunk(
  'admin/study/setRoute',
  async (data: { path_id: string; route: StudyRoute }) => {
    const docRef = await addDoc(
      collection(db, 'study_paths', data.path_id, 'study_routes'),
      {
        name: data.route.name,
      }
    );

    data.route.id = docRef.id;

    return data;
  }
);

// Write reducer set studyCard
export const setStudyCard = createAsyncThunk(
  'admin/study/setCard',
  async (data: { path_id: string; route_id: string; card: StudyCard }) => {
    const docRef = await addDoc(
      collection(
        db,
        'study_paths',
        data.path_id,
        'study_routes',
        data.route_id
      ),
      {
        //
      }
    );

    data.card.id = docRef.id;

    return data;
  }
);

// Write reducer get studyRoutes
export const updateStudyPath = createAsyncThunk(
  'admin/study/updatePath',
  async (data: StudyPath) => {
    if (data.id) {
      const docRef = doc(db, 'study_paths', data.id);
      await updateDoc(docRef, {
        name: data.name,
        topic: data.topic,
        level: data.level,
      });
    }
  }
);

// Write reducer get studyRoutes
export const updateStudyRoute = createAsyncThunk(
  'admin/study/updateRoute',
  async (data: { path_id: string; route: StudyRoute }) => {
    if (data.route.id) {
      console.log(data.route);
      const docRef = doc(
        db,
        'study_paths',
        data.path_id,
        'study_routes',
        data.route.id
      );
      await updateDoc(docRef, {
        name: data.route.name,
      });
    }
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
      state.listStudyPaths.push(action.payload as StudyPath);
    });
    builder.addCase(getStudyPath.fulfilled, (state, action) => {
      state.currentStudyPath = action.payload as StudyPath;
    });
    builder.addCase(getStudyRoute.fulfilled, (state, action) => {
      state.currentStudyRoute = action.payload as StudyRoute;
    });
    builder.addCase(setStudyRoute.fulfilled, (state, action) => {
      state.currentStudyPath.studyRoutes?.push(action.payload as StudyRoute);
    });
  },
});

export default adminSlice.reducer;
