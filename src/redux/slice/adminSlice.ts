import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayRemove,
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
import { db, storage } from "../../firebase/config";
import {
  Doc,
  Ex,
  ExDetail,
  GameType,
  StudyCard,
  StudyCardType,
  StudyPath,
  StudyRoute,
} from "../../types";
import { ref, uploadBytes } from "firebase/storage";
import { getAEx } from "./exSlice";
import { getDate } from "../../utils";

interface types {
  listStudyPaths: StudyPath[];
  currentStudyPath: StudyPath;
  currentStudyRoute: StudyCard;
  listDocs?: Doc[];
  currentDoc?: Doc;
  // list user
  listVocabs?: StudyCard[];
  listSentences?: StudyCard[];
  listEx?: Ex[];
  currentEx?: Ex;
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
  "admin/study/getPaths",
  async () => {
    var paths: StudyPath[] = [];
    const querySnapshot = await getDocs(collection(db, "study_paths"));
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
  "admin/study/getPath",
  async (id: string) => {
    var path: StudyPath;
    const docRef = await getDoc(doc(db, "study_paths", id));
    path = docRef.data() as StudyPath;

    const routeRef = await getDocs(
      collection(db, "study_paths", id, "study_routes")
    );
    path.studyRoutes = routeRef.docs.map(
      (d) => ({ id: d.id, ...d.data() } as StudyRoute)
    );

    return path;
  }
);

export const getStudyRoute = createAsyncThunk(
  "admin/study/getRoute",
  async (data: { path_id: string; id: string }) => {
    var route: StudyRoute;

    const docRef = await getDoc(
      doc(db, "study_paths", data.path_id, "study_routes", data.id)
    );
    route = docRef.data() as StudyRoute;

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

    return route;
  }
);

// Write reducer set studyPath
export const setStudyPath = createAsyncThunk(
  "admin/study/setPath",
  async (data: StudyPath) => {
    const docRef = await addDoc(collection(db, "study_paths"), {
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
  "admin/study/setRoute",
  async (data: { path_id: string; route: StudyRoute }) => {
    const docRef = await addDoc(
      collection(db, "study_paths", data.path_id, "study_routes"),
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
  "admin/study/setCard",
  async (data: { path_id: string; route_id: string; card_id: string }) => {
    await updateDoc(
      doc(db, "study_paths", data.path_id, "study_routes", data.route_id),
      {
        cards: arrayUnion(data.card_id),
      }
    );

    return data;
  }
);

// Write reducer get studyRoutes
export const updateStudyPath = createAsyncThunk(
  "admin/study/updatePath",
  async (data: StudyPath) => {
    if (data.id) {
      const docRef = doc(db, "study_paths", data.id);
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
  "admin/study/updateRoute",
  async (data: { path_id: string; route: StudyRoute }) => {
    if (data.route.id) {
      const docRef = doc(
        db,
        "study_paths",
        data.path_id,
        "study_routes",
        data.route.id
      );
      await updateDoc(docRef, {
        name: data.route.name,
      });
    }
  }
);

export const removeStudyCard = createAsyncThunk(
  "admin/study/updateCard",
  async (data: { path_id: string; route_id: string; card_id: string }) => {
    if (data.card_id) {
      const docRef = doc(
        db,
        "study_paths",
        data.path_id,
        "study_routes",
        data.route_id
      );
      await updateDoc(docRef, {
        cards: arrayRemove(data.card_id),
      });
    }
  }
);

//#endregion

//#region [DOCUMENT]

export const getAllDocs = createAsyncThunk(
  "admin/document/getAllDocs",
  async () => {
    var docs: Doc[] = [];
    const querySnapshot = await getDocs(collection(db, "docs"));
    querySnapshot.forEach(async (e) => {
      var item: Doc = e.data() as Doc;
      item.id = e.id;
      docs.push(item);
    });

    return docs;
  }
);

export const getADocWithType = createAsyncThunk(
  "admin/document/getADoc",
  async ({ doc_id, type }: { doc_id: string; type: string }) => {
    const querySnapshot = await getDoc(doc(db, "docs", doc_id));

    const data = querySnapshot.data() as Doc;
    data.id = querySnapshot.id;

    if (data.listItemIds)
      await Promise.all(
        data.listItemIds.map(async (item) => {
          switch (type) {
            case StudyCardType.Vocab.toString():
              await getDoc(doc(db, "vocabs", item)).then((snapshot) => {
                if (snapshot.data()) {
                  let card = {
                    ...(snapshot.data() as StudyCard),
                    id: snapshot.id,
                  };
                  if (data.vocabs) data.vocabs = [card, ...data.vocabs];
                  else data.vocabs = [card];
                }
              });
              break;
            case StudyCardType.Sentence.toString():
              await getDoc(doc(db, "sentences", item)).then((snapshot) => {
                if (snapshot.data()) {
                  let card = {
                    ...(snapshot.data() as StudyCard),
                    id: snapshot.id,
                  };
                  if (data.sentences)
                    data.sentences = [card, ...data.sentences];
                  else data.sentences = [card];
                }
              });
              break;
            default:
              break;
          }
        })
      );

    console.log(data);
    return data;
  }
);

export const setDocument = createAsyncThunk(
  "admin/study/setDocCard",
  async ({ data }: { data: Doc }) => {
    await addDoc(collection(db, "docs"), {
      title: data.title,
      description: data.description,
      createDate: new Date(),
    });

    return data;
  }
);

export const setVocab = createAsyncThunk(
  "admin/study/setVocab",
  async ({
    data,
    type,
    doc_id,
  }: {
    data: StudyCard;
    type: StudyCardType;
    doc_id: string;
  }) => {
    console.log(doc_id);

    const docRef = await addDoc(collection(db, "vocabs"), {
      display: data.display,
      meaning: data.meaning,
      imageFile: data.imageFile ? data.imageFile.name : "",
      audio: data.audio ? data.audio.name : "",
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
    temp.imageFile = data.imageFile ? data.imageFile.name : "";
    temp.audio = data.audio ? data.audio.name : "";

    // add to doc

    await updateDoc(doc(db, "docs", doc_id), {
      listItemIds: arrayUnion(data.id),
    });

    return temp;
  }
);

export const setSentence = createAsyncThunk(
  "admin/study/setSentence",
  async ({
    data,
    type,
    doc_id,
  }: {
    data: StudyCard;
    type: StudyCardType;
    doc_id: string;
  }) => {
    const docRef = await addDoc(collection(db, "sentences"), {
      display: data.display,
      meaning: data.meaning,
      imageFile: data.imageFile ? data.imageFile.name : "",
      audio: data.audio ? data.audio.name : "",
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
    temp.imageFile = data.imageFile ? data.imageFile.name : "";
    temp.audio = data.audio ? data.audio.name : "";

    await updateDoc(doc(db, "docs", doc_id), {
      listItemIds: arrayUnion(data.id),
    });

    return temp;
  }
);

export const getVocabs = createAsyncThunk("admin/study/getVocabs", async () => {
  var list: StudyCard[] = [];
  const querySnapshot = await getDocs(collection(db, "vocabs"));
  querySnapshot.forEach(async (e) => {
    var item: StudyCard = e.data() as StudyCard;
    item.id = e.id;
    list.push(item);
  });

  return list;
});

export const getSentences = createAsyncThunk(
  "admin/study/getSentences",
  async () => {
    var list: StudyCard[] = [];
    const querySnapshot = await getDocs(collection(db, "sentences"));
    querySnapshot.forEach(async (e) => {
      var item: StudyCard = e.data() as StudyCard;
      item.id = e.id;
      list.push(item);
    });

    return list;
  }
);

export const getVocabsByTopic = createAsyncThunk(
  "admin/study/getVocabsByTopic",
  async (title: string) => {
    var list: StudyCard[] = [];
    const q = query(collection(db, "docs"), where("title", "==", title));
    const ref = await (await getDocs(q)).docs[0];
    const document: Doc = (await ref.data()) as Doc;
    document.id = ref.id;

    const id = ref.id;

    const data = await getDoc(doc(db, "docs", id));

    const item: Doc = data.data() as Doc;
    item.id = id;
    if (item.createDate)
      item.createDate = getDate(
        (data?.data()?.createDate as Timestamp).seconds
      );

    if (item.vocabs) {
      const vocabs: string[] = item.vocabs as string[];
      let met: StudyCard[] = [];

      await Promise.all(
        vocabs.map(async (vocab) => {
          await getDoc(doc(db, "vocabs", vocab)).then((d) => {
            const dt = d.data() as StudyCard;
            dt.id = d.id;
            met = [...met, dt];
          });
        })
      );

      item.vocabs = met;

      return met;
    }
  }
);

export const updateDocument = createAsyncThunk(
  "admin/study/updateDocument",
  async ({ oldData, data }: { oldData: Doc; data: Doc }) => {
    if (data.id) {
      const docRef = doc(db, "docs", data.id);
      await updateDoc(docRef, {
        title: data.title === oldData.title ? oldData.title : data.title,
        description:
          data.description === oldData.description
            ? oldData.description
            : data.description,
      });

      return data;
    }
  }
);

export const updateVocab = createAsyncThunk(
  "admin/study/updateVocab",
  async ({
    data,
    oldImage,
    oldAudio,
  }: {
    data: StudyCard;
    oldImage: any;
    oldAudio: any;
  }) => {
    if (data.id) {
      const docRef = doc(db, "vocabs", data.id);
      await updateDoc(docRef, {
        display: data.display,
        meaning: data.meaning,
        imageFile: data.imageFile ? data.imageFile.name : oldImage,
        audio: data.audio ? data.audio.name : oldAudio,
      });

      if (data.imageFile) {
        const imgRef = ref(storage, `images/${data.imageFile.name}`);
        uploadBytes(imgRef, data.imageFile);
      }
      if (data.audio) {
        const audioRef = ref(storage, `audios/${data.audio.name}`);
        uploadBytes(audioRef, data.audio);
      }

      const temp: StudyCard = data;
      temp.imageFile = data.imageFile ? data.imageFile.name : "";
      temp.audio = data.audio ? data.audio.name : "";
      return temp;
    }
  }
);

export const updateSentence = createAsyncThunk(
  "admin/study/updateSentence",
  async ({
    data,
    oldImage,
    oldAudio,
  }: {
    data: StudyCard;
    oldImage: any;
    oldAudio: any;
  }) => {
    if (data.id) {
      const docRef = doc(db, "sentences", data.id);
      await updateDoc(docRef, {
        display: data.display,
        meaning: data.meaning,
        imageFile: data.imageFile ? data.imageFile.name : oldImage,
        audio: data.audio ? data.audio.name : oldAudio,
      });

      if (data.imageFile) {
        const imgRef = ref(storage, `images/${data.imageFile.name}`);
        uploadBytes(imgRef, data.imageFile);
      }
      if (data.audio) {
        const audioRef = ref(storage, `audios/${data.audio.name}`);
        uploadBytes(audioRef, data.audio);
      }

      const temp: StudyCard = data;
      temp.imageFile = data.imageFile ? data.imageFile.name : "";
      temp.audio = data.audio ? data.audio.name : "";
      return temp;
    }
  }
);

//#endregion

//#region [EXERCISE]

export const getExercises = createAsyncThunk(
  "admin/exercise/getExercises",
  async () => {
    var items: Ex[] = [];

    const querySnapshot = await getDocs(collection(db, "exs"));

    querySnapshot.forEach(async (e) => {
      var item: Ex = e.data() as Ex;
      item.id = e.id;
      items.push(item);
    });

    return items;
  }
);

export const getAExercise = createAsyncThunk(
  "admin/exercise/getAExercise",
  async (id: string) => {
    const querySnapshot = await getDoc(doc(db, "exs", id));

    var item: Ex = querySnapshot.data() as Ex;
    item.id = id;
    item.listItems = undefined;

    const querySnapshot1 = await getDocs(
      collection(db, "exs", id, "listItems")
    );

    var listItems: ExDetail[] = [];

    await Promise.all(
      querySnapshot1.docs.map(async (e) => {
        var d: ExDetail = e.data() as ExDetail;
        d.id = e.id;

        if (d.vocab) {
          const querySnapshot2 = await getDoc(
            doc(db, "vocabs", e.data().vocab)
          );

          d.vocab = querySnapshot2.data();
          if (d.vocab) d.vocab.id = querySnapshot2.id;
        }
        listItems = [...listItems, d];
      })
    );

    item.listItems = listItems;

    return item;
  }
);

export const updateAExercise = createAsyncThunk(
  "admin/exercise/updateAExercise;",
  async ({
    id,
    title,
    description,
  }: {
    id: string;
    title?: string;
    description?: string;
  }) => {
    await updateDoc(doc(db, "exs", id), {
      title: title,
      description: description,
    });
  }
);

export const setAExDetail = createAsyncThunk(
  "admin/exercise/setAExDetai;",
  async ({
    exId,
    vocab,
    options,
    answer,
    type,
  }: {
    exId: string;
    vocab: StudyCard;
    options: string[];
    answer: string;
    type: string;
  }) => {
    let item: ExDetail = {
      vocab,
      options,
      answer,
      type,
      question: "",
      id: "",
    };
    item.question =
      type === GameType[0]
        ? "Nghĩa của từ này là gì?"
        : "Dịch từ này sang tiếng Anh?";
    await addDoc(collection(db, "exs", exId, "listItems"), {
      vocab: vocab.id,
      options: options,
      answer: answer,
      type: type,
      question: item.question,
    }).then((e) => (item.id = e.id));

    return item;
  }
);

export const updateAExDetail = createAsyncThunk(
  "admin/exercise/updateAExDetai;",
  async ({
    data,
    exId,
    options,
    answer,
    type,
  }: {
    data: ExDetail;
    exId: string;
    options?: string[];
    answer?: string;
    type?: string;
  }) => {
    const item: ExDetail = {
      ...data,
      options: options ? options : data.options,
      answer: answer ? answer : data.answer,
      type: type ? type : data.type,
      question:
        type !== data.type && type === GameType[0]
          ? "Nghĩa của từ này là gì?"
          : "Dịch từ này sang tiếng Anh?",
    };

    await updateDoc(doc(db, "exs", exId, "listItems", data.id), {
      options: item.options,
      answer: item.answer,
      type: item.type,
      question: item.question,
    });

    return item;
  }
);

//#endregion

const adminSlice = createSlice({
  name: "admin_study",
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
    builder.addCase(getAllDocs.fulfilled, (state, action) => {
      state.listDocs = action.payload as Doc[];
    });
    builder.addCase(getADocWithType.fulfilled, (state, action) => {
      state.currentDoc = action.payload as Doc;
    });
    builder.addCase(setDocument.fulfilled, (state, action) => {
      state.listDocs?.push(action.payload as Doc);
    });
    builder.addCase(setVocab.fulfilled, (state, action) => {
      state.listVocabs?.push(action.payload as StudyCard);
      state.currentDoc?.vocabs?.push(action.payload as StudyCard);
    });
    builder.addCase(setSentence.fulfilled, (state, action) => {
      state.listSentences?.push(action.payload as StudyCard);
    });
    builder.addCase(getVocabs.fulfilled, (state, action) => {
      state.listVocabs = action.payload as StudyCard[];
    });
    builder.addCase(getSentences.fulfilled, (state, action) => {
      state.listSentences = action.payload as StudyCard[];
    });
    builder.addCase(updateDocument.fulfilled, (state, action) => {
      state.currentDoc = action.payload as Doc;
    });
    builder.addCase(updateVocab.fulfilled, (state, action) => {
      let i = state.listVocabs?.findIndex((o) => o.id === action.payload?.id);
      if (i && state.listVocabs)
        state.listVocabs[i] = action.payload as StudyCard;
      let e = state.currentDoc?.vocabs?.findIndex(
        (o) => o.id === action.payload?.id
      );
      if (e && state.currentDoc?.vocabs)
        state.currentDoc.vocabs[e] = action.payload as StudyCard;
    });
    builder.addCase(updateSentence.fulfilled, (state, action) => {
      let i = state.listSentences?.findIndex(
        (o) => o.id === action.payload?.id
      );
      if (i && state.listSentences)
        state.listSentences[i] = action.payload as StudyCard;
    });
    builder.addCase(getExercises.fulfilled, (state, action) => {
      state.listEx = action.payload as Ex[];
    });
    builder.addCase(getAExercise.fulfilled, (state, action) => {
      state.currentEx = action.payload as Ex;
    });
    builder.addCase(getVocabsByTopic.fulfilled, (state, action) => {
      state.listVocabs = action.payload as StudyCard[];
    });
    builder.addCase(setAExDetail.fulfilled, (state, action) => {
      state.currentEx?.listItems?.push(action.payload as ExDetail);
    });
    builder.addCase(updateAExDetail.fulfilled, (state, action) => {
      let i = state.currentEx?.listItems?.findIndex(
        (o) => o.id === action.payload?.id
      );
      if (i && state.currentEx?.listItems)
        state.currentEx.listItems[i] = action.payload as ExDetail;
    });
  },
});

export default adminSlice.reducer;
