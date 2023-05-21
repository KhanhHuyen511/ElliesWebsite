import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import { StudyCard, StudyPath, StudyRoute } from '../../types';
import { ref, uploadBytes } from 'firebase/storage';

interface types {
  listStudyPaths: StudyPath[];
  currentStudyPath: StudyPath;
  currentStudyRoute: StudyCard;
  // list user
  // list doc
  listVocabs?: StudyCard[];
  // list ...
}

const initialState: types = {
  listStudyPaths: [],
  currentStudyPath: {},
  currentStudyRoute: {},
};

//#region [STUDY]
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
        imageFile: data.route.imageFile.name,
      }
    );

    const storageRef = ref(storage, `images/${data.route.imageFile.name}`);
    uploadBytes(storageRef, data.route.imageFile);

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
        data.route_id,
        'vocabs'
      ),
      {
        display: data.card.display,
        meaning: data.card.meaning,
        imageFile: data.card.imageFile.name,
        audio: data.card.audio.name,
      }
    );

    const imgRef = ref(storage, `images/${data.card.imageFile.name}`);
    uploadBytes(imgRef, data.card.imageFile);
    const audioRef = ref(storage, `audios/${data.card.audio.name}`);
    uploadBytes(audioRef, data.card.audio);

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

export const updateStudyCard = createAsyncThunk(
  'admin/study/updateCard',
  async (data: { path_id: string; route_id: string; card: StudyCard }) => {
    if (data.card.id) {
      const docRef = doc(
        db,
        'study_paths',
        data.path_id,
        'study_routes',
        data.route_id,
        'vocabs',
        data.card.id
      );
      await updateDoc(docRef, {
        display: data.card.display,
        meaning: data.card.meaning,
      });
    }
  }
);

//#endregion

//#region [DOCUMENT]
export const setVocab = createAsyncThunk(
  'admin/study/setVocab',
  async (data: StudyCard) => {
    const docRef = await addDoc(collection(db, 'vocabs'), {
      display: data.display,
      meaning: data.meaning,
      imageFile: data.imageFile ? data.imageFile.name : '',
      audio: data.audio ? data.audio.name : '',
    });

    if (data.imageFile) {
      const imgRef = ref(storage, `images/${data.imageFile.name}`);
      uploadBytes(imgRef, data.imageFile);
    }
    if (data.audio) {
      const audioRef = ref(storage, `audios/${data.audio.name}`);
      uploadBytes(audioRef, data.audio);
    }
    data.id = docRef.id;

    // create temp object because data object make error (img, audio format) at payload
    const temp: StudyCard = data;
    temp.imageFile = data.imageFile ? data.imageFile.name : '';
    temp.audio = data.audio ? data.audio.name : '';

    return temp;
  }
);

export const getVocabs = createAsyncThunk('admin/study/getVocabs', async () => {
  var list: StudyCard[] = [];
  const querySnapshot = await getDocs(collection(db, 'vocabs'));
  querySnapshot.forEach(async (e) => {
    var item: StudyCard = e.data() as StudyCard;
    item.id = e.id;
    list.push(item);
  });

  return list;
});

export const updateVocab = createAsyncThunk(
  'admin/study/updateVocab',
  async (data: StudyCard) => {
    if (data.id) {
      const docRef = doc(db, 'vocabs', data.id);
      await updateDoc(docRef, {
        display: data.display,
        meaning: data.meaning,
      });

      const temp: StudyCard = data;
      temp.imageFile = data.imageFile ? data.imageFile.name : '';
      temp.audio = data.audio ? data.audio.name : '';
      return temp;
    }
  }
);

//#endregion

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
    builder.addCase(setVocab.fulfilled, (state, action) => {
      state.listVocabs?.push(action.payload as StudyCard);
    });
    builder.addCase(getVocabs.fulfilled, (state, action) => {
      state.listVocabs = action.payload as StudyCard[];
    });
    builder.addCase(updateVocab.fulfilled, (state, action) => {
      let i = state.listVocabs?.findIndex((o) => o.id === action.payload?.id);
      if (i && state.listVocabs)
        state.listVocabs[i] = action.payload as StudyCard;
    });
  },
});

export default adminSlice.reducer;
