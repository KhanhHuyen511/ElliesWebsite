import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Doc, StudyCard } from "../../types";
import { getDate } from "../../utils";

interface types {
  listDocs: Doc[];
  currentDoc?: Doc;
}

const initialState: types = {
  listDocs: [],
};

// Write reducer get Docs
export const getListDocs = createAsyncThunk("doc/getDocs", async () => {
  var docs: Doc[] = [];
  const querySnapshot = await getDocs(collection(db, "docs"));

  querySnapshot.forEach(async (e) => {
    var item: Doc = e.data() as Doc;
    item.id = e.id;
    item.vocabs = undefined;
    item.sentences = undefined;
    if (item.createDate)
      item.createDate = getDate((e.data().createDate as Timestamp).seconds);
    docs.push(item);
  });

  return docs;
});

export const getADoc = createAsyncThunk("doc/getDoc", async (id: string) => {
  const data = await getDoc(doc(db, "docs", id));

  const item: Doc = data.data() as Doc;
  item.id = id;
  if (item.createDate)
    item.createDate = getDate((data?.data()?.createDate as Timestamp).seconds);

  if (item.vocabs) {
    const vocabs: string[] = item.vocabs as string[];
    let met: StudyCard[] = [];

    await Promise.all(
      vocabs.map(async (vocab) => {
        await getDoc(doc(db, "vocabs", vocab)).then((d) => {
          met = [...met, d.data() as StudyCard];
        });
      })
    );
    // if (item.sentences) {
    // const vocabs: string[] = item.vocabs as string[];
    // let met: StudyCard[] = [];

    // await Promise.all(
    //   vocabs.map(async (vocab) => {
    //     await getDoc(doc(db, "vocabs", vocab)).then((d) => {
    //       met = [...met, d.data() as StudyCard];
    //     });
    //   })
    // );

    item.vocabs = met;
  }

  return item;
});

export const getListVocabs = createAsyncThunk(
  "doc/getVocabs",
  async (list: StudyCard[]) => {
    var items: StudyCard[] = [];

    list.forEach(async (item) => {
      // const i = await getDoc(doc(db, 'vocabs', item.id));
      // items.push(i);
    });

    return items;
  }
);

const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListDocs.fulfilled, (state, action) => {
      state.listDocs = action.payload as Doc[];
    });
    builder.addCase(getADoc.fulfilled, (state, action) => {
      state.currentDoc = action.payload;
    });
    builder.addCase(getListVocabs.fulfilled, (state, action) => {
      // state.currentDoc = action.payload;
    });
  },
});

export default docSlice.reducer;
