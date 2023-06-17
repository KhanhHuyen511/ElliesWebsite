import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Ex, ExDetail, UserEx } from "../../types";
import { getDate } from "../../utils";

interface types {
  listExs: Ex[];
  listUserExs?: UserEx[];
  currentEx?: Ex;
  currentUserEx?: UserEx;
  completeID?: string;
}

const initialState: types = {
  listExs: [],
};

// Write reducer get Docs
export const getListExs = createAsyncThunk("exercise/getExs", async () => {
  var exs: Ex[] = [];
  const querySnapshot = await getDocs(collection(db, "exs"));

  querySnapshot.forEach(async (e) => {
    var item: Ex = e.data() as Ex;
    item.id = e.id;
    item.listItems = undefined;
    exs.push(item);
  });

  return exs;
});

export const getListUserExs = createAsyncThunk(
  "doc/getUserExs",
  async (userId: string) => {
    var exs: UserEx[] = [];

    const q = await query(
      collection(db, "userExs"),
      where("userId", "==", userId)
    );
    await Promise.all(
      (
        await getDocs(q)
      ).docs.map(async (item) => {
        let temp: UserEx = item.data() as UserEx;

        // get result list of current user
        const querySnapshot = await getDocs(
          collection(db, "userExs", item.id, "resultList")
        );

        const resultList: ExDetail[] = [];

        querySnapshot.forEach(async (e) => {
          var d: ExDetail = e.data() as ExDetail;
          d.id = e.id;
          resultList.push(d);
        });

        // get ex object
        const exID = item.data().ex;
        const ex = (await (await getDoc(doc(db, "exs", exID))).data()) as Ex;

        temp.id = item.id;
        temp.ex = ex;
        temp.resultList = resultList;

        if (temp.didDate)
          temp.didDate = getDate((item.data().didDate as Timestamp).seconds);

        exs = [...exs, temp];
      })
    );
    return exs;
  }
);

export const getAEx = createAsyncThunk(
  "exercise/getAEx",
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

export const getAnUserEx = createAsyncThunk(
  "exercise/getAnUserEx",
  async (id: string) => {
    const snapshort = await getDoc(doc(db, "userExs", id));

    var item: UserEx = snapshort.data() as UserEx;
    item.id = id;

    const querySnapshot = await getDocs(
      collection(db, "userExs", id, "resultList")
    );

    const resultList: ExDetail[] = [];

    querySnapshot.forEach(async (e) => {
      var d: ExDetail = e.data() as ExDetail;
      d.id = e.id;
      resultList.push(d);
    });

    item.resultList = resultList;
    return item;
  }
);

export const setCompleteExState = createAsyncThunk(
  "exercise/setExerciseState",
  async (data: { resultList: ExDetail[]; exId: string; userID: string }) => {
    const snapshot = await addDoc(collection(db, "userExs"), {
      userId: data.userID,
      ex: data.exId,
      didDate: new Date(),
    });

    await Promise.all(
      data.resultList.map(
        async (item) =>
          await addDoc(collection(db, "userExs", snapshot.id, "resultList"), {
            ...item,
          })
      )
    );

    return snapshot.id;
  }
);

const exSlice = createSlice({
  name: "ex",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListExs.fulfilled, (state, action) => {
      state.listExs = action.payload as Ex[];
    });
    builder.addCase(getListUserExs.fulfilled, (state, action) => {
      state.listUserExs = action.payload as UserEx[];
    });
    builder.addCase(getAEx.fulfilled, (state, action) => {
      state.currentEx = action.payload;
    });
    builder.addCase(getAnUserEx.fulfilled, (state, action) => {
      state.currentUserEx = action.payload;
    });
    builder.addCase(setCompleteExState.fulfilled, (state, action) => {
      state.completeID = action.payload;
    });
  },
});

export default exSlice.reducer;
