import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import {
  Doc,
  Ex,
  ExDetail,
  GameType,
  Gender,
  LevelType,
  OnboardingType,
  Student,
  StudyCard,
  StudyCardType,
  StudyPath,
  StudyRoute,
  TestType,
} from "../../types";
import { ref, uploadBytes } from "firebase/storage";
import { getDate } from "../../utils/utils";

interface types {
  listStudyPaths: StudyPath[];
  currentStudyPath: StudyPath;
  currentStudyRoute: StudyRoute;
  listDocs?: Doc[];
  currentDoc?: Doc;
  listVocabs?: StudyCard[];
  listSentences?: StudyCard[];
  listParaphs?: StudyCard[];
  listEx?: Ex[];
  currentEx?: Ex;
  listUsers?: Student[];
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
    console.log("hi");
    var paths: StudyPath[] = [];
    const querySnapshot = (await getDocs(collection(db, "study_paths"))).docs;

    await Promise.all(
      querySnapshot.map(async (e) => {
        var item: StudyPath = e.data() as StudyPath;
        item.id = e.id;

        const itemSnapshot = await (
          await getDocs(collection(db, "study_paths", e.id, "study_routes"))
        ).docs;

        if (itemSnapshot && itemSnapshot.length > 0) {
          item.studyRoutes = itemSnapshot.map((i) => i.data());
        }

        paths = [...paths, item];
      })
    );

    return paths;
  }
);

// Write reducer get studyRoutes
export const getStudyPath = createAsyncThunk(
  "admin/study/getPath",
  async (id: string) => {
    console.log("hi");
    var path: StudyPath;
    const docRef = await getDoc(doc(db, "study_paths", id));
    path = docRef.data() as StudyPath;

    const itemSnapshot = await (
      await getDocs(collection(db, "study_paths", id, "study_routes"))
    ).docs;

    if (itemSnapshot && itemSnapshot.length > 0) {
      path.studyRoutes = [];
      await Promise.all(
        itemSnapshot.map(async (i) => {
          let item: StudyRoute = {};
          item.id = i.id;
          item.name = i.data().name;
          item.imageFile = i.data().imageFile;

          const docRef = (
            await getDoc(doc(db, "study_paths", id, "study_routes", i.id))
          ).data() as StudyRoute;

          item.cards = docRef.cards;

          if (path.studyRoutes) path.studyRoutes = [...path.studyRoutes, item];
          else path.studyRoutes = [item];
        })
      );

      path.studyRoutes = path.studyRoutes.sort(
        (a, b) => Number(a.name) - Number(b.name)
      );
    }

    return path;
  }
);

export const getStudyRoute = createAsyncThunk(
  "admin/study/getRoute",
  async (data: { path_id: string; id: string }) => {
    var route: StudyRoute;

    console.log("hi");

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
    console.log("hi");
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
    console.log("hi");
    const docRef = await addDoc(
      collection(db, "study_paths", data.path_id, "study_routes"),
      {
        name: data.route.name,
        imageFile: data.route.imageFile ? data.route.imageFile.name : "",
      }
    );

    if (data.route.imageFile !== null) {
      const storageRef = ref(storage, `images/${data.route.imageFile.name}`);
      uploadBytes(storageRef, data.route.imageFile);
    }

    data.route.id = docRef.id;

    return data.route;
  }
);

// Write reducer set studyCard
export const setStudyCard = createAsyncThunk(
  "admin/study/setCard",
  async (data: { path_id: string; route_id: string; card: StudyCard }) => {
    console.log("hi");
    await updateDoc(
      doc(db, "study_paths", data.path_id, "study_routes", data.route_id),
      {
        cards: arrayUnion(data.card.id),
      }
    );

    return data.card;
  }
);

// Write reducer get studyRoutes
export const updateStudyPath = createAsyncThunk(
  "admin/study/updatePath",
  async (data: StudyPath) => {
    console.log("hi");
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
    console.log("hi");
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
    return data.route;
  }
);

export const removeStudyCard = createAsyncThunk(
  "admin/study/removeCard",
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

    return data.card_id;
  }
);

export const removeStudyRoute = createAsyncThunk(
  "admin/study/removeRoute",
  async (data: { path_id: string; route_id: string }) => {
    console.log("hi");

    const docRef = doc(
      db,
      "study_paths",
      data.path_id,
      "study_routes",
      data.route_id
    );
    await deleteDoc(docRef);

    return data.route_id;
  }
);

export const removeStudyPath = createAsyncThunk(
  "admin/study/removePath",
  async (data: { path_id: string }) => {
    console.log("hi");

    const docRef = doc(db, "study_paths", data.path_id);
    await deleteDoc(docRef);

    return data.path_id;
  }
);

//#endregion

//#region [DOCUMENT]

export const getAllDocs = createAsyncThunk(
  "admin/document/getAllDocs",
  async () => {
    console.log("hi");
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
    console.log("hi");
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
            case StudyCardType.Paraph.toString():
              await getDoc(doc(db, "paraphs", item)).then((snapshot) => {
                if (snapshot.data()) {
                  let card = {
                    ...(snapshot.data() as StudyCard),
                    id: snapshot.id,
                  };
                  if (data.paraphs) data.paraphs = [card, ...data.paraphs];
                  else data.paraphs = [card];
                }
              });
              break;
            default:
              break;
          }
        })
      );

    return data;
  }
);

export const setDocument = createAsyncThunk(
  "admin/document/setDocument",
  async ({ data }: { data: Doc }) => {
    console.log("hi");
    const ref = await addDoc(collection(db, "docs"), {
      title: data.title,
      description: data.description,
      createDate: new Date(),
    });

    data.id = ref.id;
    return data;
  }
);

export const setDocCard = createAsyncThunk(
  "admin/document/setDocCard",
  async ({
    data,
    type,
    doc_id,
  }: {
    data: StudyCard;
    type: StudyCardType;
    doc_id: string;
  }) => {
    console.log("hi");
    console.log(data);
    let typeCard = "";

    // get Type
    switch (type) {
      case StudyCardType.Vocab:
        typeCard = "vocabs";
        break;
      case StudyCardType.Sentence:
        typeCard = "sentences";
        break;
      case StudyCardType.Paraph:
        typeCard = "paraphs";
        break;
      case StudyCardType.Book:
        typeCard = "books";
        break;
      default:
        break;
    }

    const docRef = await addDoc(collection(db, typeCard), {
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

    return { data: temp, type };
  }
);

export const getVocabs = createAsyncThunk("admin/study/getVocabs", async () => {
  console.log("hi");
  var list: StudyCard[] = [];
  const querySnapshot = await getDocs(collection(db, "vocabs"));
  querySnapshot.forEach(async (e) => {
    var item: StudyCard = e.data() as StudyCard;
    item.id = e.id;
    list.push(item);
  });

  return list;
});

export const getDocCardWithTopic = createAsyncThunk(
  "admin/document/getDocCardWithTopic",
  async ({ topic, type }: { topic: string; type: StudyCardType }) => {
    console.log("hi");
    let typeCard = "";

    // get Type
    switch (type) {
      case StudyCardType.Vocab:
        typeCard = "vocabs";
        break;
      case StudyCardType.Sentence:
        typeCard = "sentences";
        break;
      case StudyCardType.Paraph:
        typeCard = "paraphs";
        break;
      case StudyCardType.Book:
        typeCard = "books";
        break;
      default:
        break;
    }

    var list: StudyCard[] = [];
    const q = query(collection(db, "docs"), where("title", "==", topic));
    const aDoc: Doc = (await getDocs(q)).docs[0].data() as Doc;
    const l = aDoc.listItemIds;

    if (l)
      await Promise.all(
        l.map(async (item) => {
          let snapshot = await getDoc(doc(db, typeCard, item));
          let card: StudyCard = {
            ...(snapshot.data() as StudyCard),
            id: snapshot.id,
          };
          if (snapshot.data()) list.push(card as StudyCard);
        })
      );

    return { data: list, type };
  }
);

export const getDocCardWithTopicLevel = createAsyncThunk(
  "admin/document/getDocCardWithTopicLevel",
  async ({ topic, level }: { topic: string; level: LevelType }) => {
    console.log("hi");

    var list: StudyCard[] = [];

    const q = query(
      collection(db, "study_paths"),
      where("topic", "==", topic),
      where("level", "==", level)
    );

    const pathId = (await getDocs(q)).docs[0].id;

    const studyRouteQ = query(
      collection(db, "study_paths", pathId, "study_routes")
    );

    const routesDocs = (await getDocs(studyRouteQ)).docs;

    let cards: StudyCard[] = [];

    await Promise.all(
      routesDocs.map(async (i) => {
        let cardIds: string[] = i.data().cards;
        await Promise.all(
          cardIds.map(async (e) => {
            let snapshot = await getDoc(doc(db, "vocabs", e));
            if (snapshot.data() === undefined) {
              snapshot = await getDoc(doc(db, "sentences", e));
            }
            if (snapshot.data() !== undefined) {
              let item = snapshot.data() as StudyCard;
              cards = [...cards, { ...item, id: snapshot.id }];
            }
          })
        );
      })
    );

    return cards;
  }
);

export const getSentences = createAsyncThunk(
  "admin/document/getSentences",
  async () => {
    console.log("hi");
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

export const updateDocument = createAsyncThunk(
  "admin/document/updateDocument",
  async ({ oldData, data }: { oldData: Doc; data: Doc }) => {
    console.log("hi");
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

export const updateDocCard = createAsyncThunk(
  "admin/document/updateDocCard",
  async ({
    data,
    oldImage,
    oldAudio,
    type,
  }: {
    data: StudyCard;
    oldImage: any;
    oldAudio: any;
    type: StudyCardType;
  }) => {
    if (data.id) {
      console.log("hi");
      let typeCard = "";

      // get Type
      switch (type) {
        case StudyCardType.Vocab:
          typeCard = "vocabs";
          break;
        case StudyCardType.Sentence:
          typeCard = "sentences";
          break;
        case StudyCardType.Paraph:
          typeCard = "paraphs";
          break;
        case StudyCardType.Book:
          typeCard = "books";
          break;
        default:
          break;
      }

      const docRef = doc(db, typeCard, data.id);
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

      return { data: temp, type };
    }
  }
);

export const removeDocCard = createAsyncThunk(
  "admin/document/removeDocCard",
  async ({
    docId,
    data,
    type,
  }: {
    docId: string;
    data: StudyCard;
    type: StudyCardType;
  }) => {
    if (docId && data.id) {
      console.log("hi");
      let typeCard = "";

      // get Type
      switch (type) {
        case StudyCardType.Vocab:
          typeCard = "vocabs";
          break;
        case StudyCardType.Sentence:
          typeCard = "sentences";
          break;
        case StudyCardType.Paraph:
          typeCard = "paraphs";
          break;
        case StudyCardType.Book:
          typeCard = "books";
          break;
        default:
          break;
      }

      // remove in document
      await updateDoc(doc(db, "docs", docId), {
        listItemIds: arrayRemove(data.id),
      });

      // remove in vocabs/sentences/paraphs
      console.log(typeCard);
      await deleteDoc(doc(db, typeCard, data.id));
    }
  }
);

//#endregion

//#region [EXERCISE]

export const getExercises = createAsyncThunk(
  "admin/exercise/getExercises",
  async () => {
    console.log("hi");
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
    console.log("hi");
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
        var d: ExDetail = { ...(e.data() as ExDetail), id: e.id };

        if (d.vocab) {
          let querySnapshot2 = await getDoc(doc(db, "vocabs", e.data().vocab));

          if (!querySnapshot2.data()) {
            querySnapshot2 = await getDoc(doc(db, "sentences", e.data().vocab));
          }

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

export const setExercise = createAsyncThunk(
  "admin/study/setExercise",
  async ({ data }: { data: Ex }) => {
    console.log("hi");
    const ref = await addDoc(collection(db, "exs"), {
      title: data.title,
      description: data.description,
      createDate: new Date(),
      level: data.level,
    });

    data.id = ref.id;

    return data;
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
    console.log("hi");
    await updateDoc(doc(db, "exs", id), {
      title: title,
      description: description,
    });
  }
);

export const removeAExercise = createAsyncThunk(
  "admin/exercise/removeAExercise;",
  async ({ id }: { id: string }) => {
    console.log("hi");
    await deleteDoc(doc(db, "exs", id));
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
    keyWord,
  }: {
    exId: string;
    vocab: StudyCard;
    options: string[];
    answer: string;
    type: GameType | string;
    keyWord?: string;
  }) => {
    console.log("hi");
    const getQuestion = () => {
      switch (type) {
        case GameType.TranslateToVN.toString():
          return "Nghĩa của từ này là gì?";
        case GameType.TranslateToEN.toString():
          return "Dịch từ này sang tiếng Anh?";
        case GameType.TranslateSentenceToVN.toString():
          return "Nghĩa của câu này là gì?";
        case GameType.TranslateSentenceToEN.toString():
          return "Dịch câu này sang tiếng Anh?";
        case GameType.FillInSentence.toString():
          return "Chọn từ phù hợp nhất để điền vào chỗ trống.";
        case GameType.SortWords.toString():
          return "Hãy sắp xếp thứ tự các từ để có một câu đúng.";
        default:
          return "";
      }
    };

    let item: ExDetail = {
      vocab,
      options,
      answer,
      type: type as GameType,
      question: getQuestion(),
      id: "",
    };

    switch (type) {
      case GameType.FillInSentence.toString():
        await addDoc(collection(db, "exs", exId, "listItems"), {
          vocab: vocab.id,
          options: options,
          answer: answer,
          type: type,
          question: item.question,
          keyWord,
        }).then((e) => (item.id = e.id));
        break;
      case GameType.SortWords.toString():
        await addDoc(collection(db, "exs", exId, "listItems"), {
          vocab: vocab.id,
          type: type,
          question: item.question,
        }).then((e) => (item.id = e.id));
        break;
      default:
        await addDoc(collection(db, "exs", exId, "listItems"), {
          vocab: vocab.id,
          options: options,
          answer: answer,
          type: type,
          question: item.question,
        }).then((e) => (item.id = e.id));
        break;
    }

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
    keyWord,
  }: {
    data: ExDetail;
    exId: string;
    options?: string[];
    answer?: string;
    type?: GameType | string;
    keyWord?: string;
  }) => {
    console.log("hi");
    const getQuestion = () => {
      switch (type) {
        case GameType.TranslateToVN.toString():
          return "Nghĩa của từ này là gì?";
        case GameType.TranslateToEN.toString():
          return "Dịch từ này sang tiếng Anh?";
        case GameType.TranslateSentenceToVN.toString():
          return "Nghĩa của câu này là gì?";
        case GameType.TranslateSentenceToEN.toString():
          return "Dịch câu này sang tiếng Anh?";
        case GameType.FillInSentence.toString():
          return "Chọn từ phù hợp nhất để điền vào chỗ trống.";
        case GameType.SortWords.toString():
          return "Hãy sắp xếp thứ tự các từ để có một câu đúng.";
        default:
          return "";
      }
    };

    let item: ExDetail = data;

    switch (type) {
      case GameType.FillInSentence.toString():
        item = {
          ...data,
          options: options ? options : data.options,
          answer: answer ? answer : data.answer,
          type: type ? (type as unknown as GameType) : (data.type as GameType),
          question:
            (type as unknown as GameType) !== data.type
              ? getQuestion()
              : data.question,
          keyWord,
        };
        await updateDoc(doc(db, "exs", exId, "listItems", data.id), {
          options: item.options,
          answer: item.answer,
          type: item.type,
          question: item.question,
          keyWord,
        });
        break;
      case GameType.SortWords.toString():
        item = {
          id: data.id,
          vocab: data.vocab,
          type: type ? (type as unknown as GameType) : (data.type as GameType),
          question:
            (type as unknown as GameType) !== data.type
              ? getQuestion()
              : data.question,
        };
        await updateDoc(doc(db, "exs", exId, "listItems", data.id), {
          type: item.type,
          question: item.question,
          options: [],
          answer: "",
          keyWord: "",
        });
        break;
      default:
        item = {
          ...data,
          options: options ? options : data.options,
          answer: answer ? answer : data.answer,
          type: type ? (type as GameType) : (data.type as GameType),
          question: type !== data.type ? getQuestion() : data.question,
        };
        await updateDoc(doc(db, "exs", exId, "listItems", data.id), {
          options: item.options,
          answer: item.answer,
          type: item.type,
          question: item.question,
        });
        break;
    }

    return item;
  }
);

export const removeAExDetail = createAsyncThunk(
  "admin/exercise/removeAExDetail",
  async ({ exId, id }: { exId: string; id: string }) => {
    console.log("hi");
    await deleteDoc(doc(db, "exs", exId, "listItems", id));

    return id;
  }
);

//#endregion

//#region [USER]
export const getAllStudents = createAsyncThunk(
  "admin/users/get_all_users",
  async () => {
    console.log("hi");
    var items: Student[] = [];

    const querySnapshot = await getDocs(collection(db, "students"));

    querySnapshot.forEach(async (e) => {
      var item: Student = e.data() as Student;
      if (e.data().birthday) item.birthday = getDate(e.data().birthday.seconds);
      items.push(item);
    });

    return items;
  }
);

export const getAllStudentsAscendByPoint = createAsyncThunk(
  "admin/users/get_users_ascend_by_point",
  async () => {
    console.log("hi");
    var items: Student[] = [];

    const querySnapshot = await getDocs(collection(db, "students"));

    querySnapshot.forEach(async (e) => {
      var item: Student = e.data() as Student;
      if (e.data().birthday) item.birthday = getDate(e.data().birthday.seconds);
      items.push(item);
    });

    items = items.slice().sort(function (a, b) {
      if (!a.point) return 1;
      if (!b.point) return -1;

      if (a.point > b.point) return -1;

      return 1;
    });

    return items;
  }
);

export const updateAStudent = createAsyncThunk(
  "admin/users/update_a_user",
  async ({ data, oldData }: { data: Student; oldData: Student }) => {
    if (data.id) {
      const q = query(collection(db, "students"), where("id", "==", data.id));
      const user = (await getDocs(q)).docs[0];

      await updateDoc(user.ref, {
        name:
          data.name !== undefined && data.name !== oldData.name
            ? data.name
            : oldData.name,
        gender:
          data.gender !== null && data.gender !== oldData.gender?.toString()
            ? (data.gender as Gender)
            : (oldData.gender as Gender),
        bio: data.bio !== oldData.bio ? data.bio : oldData.bio,
      });

      if (data.birthday && data.birthday !== oldData.birthday)
        await updateDoc(user.ref, {
          birthday: data.birthday,
        });
    }
  }
);

export const removeAStudent = createAsyncThunk(
  "admin/users/remove_a_user",
  async (id: string) => {
    console.log("hi");

    const q = query(collection(db, "students"), where("id", "==", id));
    const user = (await getDocs(q)).docs[0];

    if (id) {
      await deleteDoc(user.ref);
    }

    const q1 = query(collection(db, "accounts"), where("user_id", "==", id));
    const user1 = (await getDocs(q1)).docs[0];

    if (id) {
      await deleteDoc(user1.ref);
    }
  }
);

export const lockAStudent = createAsyncThunk(
  "admin/users/lock_a_user",
  async (id: string) => {
    console.log("hi");

    const q = query(collection(db, "accounts"), where("user_id", "==", id));
    const user = (await getDocs(q)).docs[0];

    if (id) {
      await updateDoc(user.ref, {
        isLocked: true,
      });
    }
  }
);

export const unlockAStudent = createAsyncThunk(
  "admin/users/unlock_a_user",
  async (id: string) => {
    const q = query(collection(db, "accounts"), where("user_id", "==", id));
    const user = (await getDocs(q)).docs[0];

    if (id) {
      await updateDoc(user.ref, {
        isLocked: false,
      });
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "admin/users/delete_user",
  async (id: string) => {
    console.log("hi");

    let q = query(collection(db, "accounts"), where("user_id", "==", id));
    let account = (await getDocs(q)).docs[0];

    if (id) {
      await deleteDoc(account.ref);
    }

    q = query(collection(db, "students"), where("id", "==", id));
    let student = (await getDocs(q)).docs[0];

    if (id) {
      await deleteDoc(student.ref);
    }
  }
);

//#endregion

//#region [ONBOARDING]

export const getOnboardingList = createAsyncThunk(
  "onboard/get_onboarding_list",
  async () => {
    console.log("hi");

    const colRef = await getDocs(collection(db, "onboarding"));
    const rawList = colRef.docs;

    let list: OnboardingType[] = [];

    if (rawList.length > 0) {
      list = rawList.map((doc) => {
        const item = doc.data() as OnboardingType;

        item.id = doc.id;

        return item;
      });
    }

    const getRandom = (arr: any[], n: number) => {
      var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
    };

    const randomQuestions = () => {
      const basic = list.filter((item) => String(item.level) === "0");
      const immediate = list.filter((item) => String(item.level) === "1");
      const advanced = list.filter((item) => String(item.level) === "2");

      const basicList = getRandom(basic, 3);
      const immediateList = getRandom(immediate, 4);
      const advancedList = getRandom(advanced, 3);

      list = [...basicList, ...immediateList, ...advancedList];
    };

    randomQuestions();

    return list;
  }
);

export const getOnboardingListAdmin = createAsyncThunk(
  "admin/onboard/get_onboarding_list",
  async () => {
    console.log("hi");

    const colRef = await getDocs(collection(db, "onboarding"));
    const rawList = colRef.docs;

    let list: OnboardingType[] = [];

    if (rawList.length > 0) {
      list = rawList.map((doc) => {
        const item = doc.data() as OnboardingType;

        item.id = doc.id;

        return item;
      });
    }

    return list;
  }
);

export const addOnboardingQuestion = createAsyncThunk(
  "admin/onboard/add_onboarding_question",
  async (data: OnboardingType) => {
    const convertedData = {
      ...data,
      audio: data.audio ? data.audio.name : null,
    };

    const addRef = await addDoc(collection(db, "onboarding"), convertedData);

    if (data.audio) {
      const audioRef = ref(storage, `audios/${data.audio.name}`);
      uploadBytes(audioRef, data.audio);
    }
    data.id = addRef.id;

    return data;
  }
);

export const editOnboardingQuestion = createAsyncThunk(
  "admin/onboard/edit_onboarding_question",
  async (data: OnboardingType) => {
    const { id, question, answer, options, level, type } = data;
    const ref = (await getDoc(doc(db, "onboarding", id))).ref;

    await updateDoc(ref, {
      question,
      answer,
      options,
      level,
      type,
    });

    return data;
  }
);

export const deleteOnboardingQuestion = createAsyncThunk(
  "admin/onboard/delete_onboarding_question",
  async (id: string) => {
    const ref = (await getDoc(doc(db, "onboarding", id))).ref;

    await deleteDoc(ref);
  }
);

//#endregion

//#region [TEST UPDATE LEVEL]

export const getTestList = createAsyncThunk(
  "test/get_test_update_level_list",
  async () => {
    console.log("hi");

    const colRef = await getDocs(collection(db, "test_level_up"));
    const rawList = colRef.docs;

    let list: TestType[] = [];

    if (rawList.length > 0) {
      list = rawList.map((doc) => {
        const item = doc.data() as TestType;

        item.id = doc.id;

        return item;
      });
    }

    const getRandom = (arr: any[], n: number) => {
      var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
    };

    const randomQuestions = () => {
      const basic = list.filter((item) => String(item.level) === "0");
      const immediate = list.filter((item) => String(item.level) === "1");
      const advanced = list.filter((item) => String(item.level) === "2");

      const basicList = getRandom(basic, 3);
      const immediateList = getRandom(immediate, 4);
      const advancedList = getRandom(advanced, 3);

      list = [...basicList, ...immediateList, ...advancedList];
    };

    randomQuestions();

    return list;
  }
);

export const getTestListAdmin = createAsyncThunk(
  "admin/test/get_test_update_level_list",
  async () => {
    console.log("hi");

    const colRef = await getDocs(collection(db, "test_level_up"));
    const rawList = colRef.docs;

    let list: TestType[] = [];

    if (rawList.length > 0) {
      list = rawList.map((doc) => {
        const item = doc.data() as TestType;

        item.id = doc.id;

        return item;
      });
    }

    return list;
  }
);

export const addTestQuestion = createAsyncThunk(
  "admin/test/add_test_update_level_question",
  async (data: TestType) => {
    const convertedData = {
      ...data,
      audio: data.audio ? data.audio.name : null,
    };

    const addRef = await addDoc(collection(db, "test_level_up"), convertedData);

    if (data.audio) {
      const audioRef = ref(storage, `audios/${data.audio.name}`);
      uploadBytes(audioRef, data.audio);
    }
    data.id = addRef.id;

    return data;
  }
);

export const editTestQuestion = createAsyncThunk(
  "admin/test/edit_test_update_level_question",
  async (data: TestType) => {
    const { id, question, answer, options, level, type } = data;
    const ref = (await getDoc(doc(db, "test_level_up", id))).ref;

    await updateDoc(ref, {
      question,
      answer,
      options,
      level,
      type,
    });

    return data;
  }
);

export const deleteTestQuestion = createAsyncThunk(
  "admin/test/delete_test_update_level_question",
  async (id: string) => {
    const ref = (await getDoc(doc(db, "test_level_up", id))).ref;

    await deleteDoc(ref);
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
      if (state.currentStudyPath.studyRoutes)
        state.currentStudyPath.studyRoutes = [
          ...state.currentStudyPath.studyRoutes,
          action.payload as StudyRoute,
        ];
    });
    builder.addCase(updateStudyRoute.fulfilled, (state, action) => {
      let i = state.currentStudyPath.studyRoutes?.findIndex(
        (o) => o.id === action.payload?.id
      );
      if (i && state.currentStudyPath.studyRoutes)
        state.currentStudyPath.studyRoutes[i] = action.payload as StudyRoute;
    });
    builder.addCase(removeStudyPath.fulfilled, (state, action) => {
      let i = state.listStudyPaths.findIndex((o) => o.id === action.payload);
      if (i && state.listStudyPaths) state.listStudyPaths.splice(i, 1);
    });
    builder.addCase(removeStudyRoute.fulfilled, (state, action) => {
      let i = state.currentStudyPath.studyRoutes?.findIndex(
        (o) => o.id === action.payload
      );
      if (i && state.currentStudyPath.studyRoutes)
        state.currentStudyPath.studyRoutes.splice(i, 1);
    });
    builder.addCase(setStudyCard.fulfilled, (state, action) => {
      // state.currentStudyRoute.vocabs.push(action.payload as string);
      if (state.currentStudyRoute.vocabs)
        state.currentStudyRoute.vocabs = [
          ...state.currentStudyRoute.vocabs,
          action.payload as StudyCard,
        ];
    });
    builder.addCase(removeStudyCard.fulfilled, (state, action) => {
      let i = state.currentStudyRoute.vocabs?.findIndex(
        (o) => o.id === action.payload
      );
      if (i && state.currentStudyRoute.vocabs)
        state.currentStudyRoute.vocabs.splice(i, 1);
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
    builder.addCase(setDocCard.fulfilled, (state, action) => {
      switch (action.payload.type) {
        case StudyCardType.Vocab:
          state.listVocabs?.push(action.payload.data as StudyCard);
          state.currentDoc?.vocabs?.push(action.payload.data as StudyCard);
          break;
        case StudyCardType.Sentence:
          state.listSentences?.push(action.payload.data as StudyCard);
          state.currentDoc?.sentences?.push(action.payload.data as StudyCard);
          break;
        case StudyCardType.Paraph:
          state.listParaphs?.push(action.payload.data as StudyCard);
          state.currentDoc?.paraphs?.push(action.payload.data as StudyCard);
          break;
        case StudyCardType.Book:
          break;
        default:
          break;
      }
    });
    builder.addCase(getVocabs.fulfilled, (state, action) => {
      state.listVocabs = action.payload as StudyCard[];
    });
    builder.addCase(getDocCardWithTopic.fulfilled, (state, action) => {
      switch (action.payload.type) {
        case StudyCardType.Vocab:
          state.listVocabs = action.payload.data as StudyCard[];
          break;
        case StudyCardType.Sentence:
          state.listSentences = action.payload.data as StudyCard[];
          break;
        case StudyCardType.Paraph:
          state.listParaphs = action.payload.data as StudyCard[];
          break;
        default:
          break;
      }
    });
    builder.addCase(getDocCardWithTopicLevel.fulfilled, (state, action) => {
      state.listVocabs = action.payload as StudyCard[];
    });
    builder.addCase(getSentences.fulfilled, (state, action) => {
      state.listSentences = action.payload as StudyCard[];
    });
    builder.addCase(updateDocument.fulfilled, (state, action) => {
      state.currentDoc = action.payload as Doc;
    });
    builder.addCase(updateDocCard.fulfilled, (state, action) => {
      switch (action.payload?.type) {
        case StudyCardType.Vocab:
          {
            let i = state.listVocabs?.findIndex(
              (o) => o.id === action.payload?.data.id
            );
            if (i && state.listVocabs)
              state.listVocabs[i] = action.payload.data as StudyCard;
            let e = state.currentDoc?.vocabs?.findIndex(
              (o) => o.id === action.payload?.data.id
            );
            if (e && state.currentDoc?.vocabs)
              state.currentDoc.vocabs[e] = action.payload.data as StudyCard;
          }
          break;
        case StudyCardType.Sentence:
          {
            let i = state.listSentences?.findIndex(
              (o) => o.id === action.payload?.data.id
            );
            if (i && state.listSentences)
              state.listSentences[i] = action.payload.data as StudyCard;
            let e = state.currentDoc?.sentences?.findIndex(
              (o) => o.id === action.payload?.data.id
            );
            if (e && state.currentDoc?.sentences)
              state.currentDoc.sentences[e] = action.payload.data as StudyCard;
          }
          break;
        case StudyCardType.Paraph:
          {
            let i = state.listParaphs?.findIndex(
              (o) => o.id === action.payload?.data.id
            );
            if (i && state.listParaphs)
              state.listParaphs[i] = action.payload.data as StudyCard;
            let e = state.currentDoc?.paraphs?.findIndex(
              (o) => o.id === action.payload?.data.id
            );
            if (e && state.currentDoc?.paraphs)
              state.currentDoc.paraphs[e] = action.payload.data as StudyCard;
          }
          break;
        default:
          break;
      }
    });
    builder.addCase(getExercises.fulfilled, (state, action) => {
      state.listEx = action.payload as Ex[];
    });
    builder.addCase(getAExercise.fulfilled, (state, action) => {
      state.currentEx = action.payload as Ex;
    });
    builder.addCase(setExercise.fulfilled, (state, action) => {
      state.listEx?.push(action.payload as Ex);
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
    builder.addCase(removeAExDetail.fulfilled, (state, action) => {
      let i = state.currentEx?.listItems?.findIndex(
        (o) => o.id === action.payload
      );
      if (i && state.currentEx?.listItems)
        state.currentEx.listItems.splice(i, 1);
    });
    builder.addCase(getAllStudents.fulfilled, (state, action) => {
      state.listUsers = action.payload;
    });
    builder.addCase(getAllStudentsAscendByPoint.fulfilled, (state, action) => {
      state.listUsers = action.payload;
    });
  },
});

export default adminSlice.reducer;
function getRandom(basic: OnboardingType[], arg1: number) {
  throw new Error("Function not implemented.");
}
