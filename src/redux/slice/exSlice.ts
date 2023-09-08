import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Ex, ExAgain, ExDetail, ExState, Student, UserEx } from "../../types";
import { getDate, getTimes } from "../../utils";

interface types {
  listExs: Ex[];
  listUserExs?: UserEx[];
  currentEx?: Ex;
  currentUserEx?: UserEx;
  currentExAgain?: ExAgain;
  completeID?: string;
  exDashboard?: number;
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

export const getListExsByLevel = createAsyncThunk(
  "exercise/getExs_by_level",
  async (userID: string) => {
    console.log("hi");

    var exs: Ex[] = [];
    const userQ = query(collection(db, "students"), where("id", "==", userID));

    const user = (await getDocs(userQ)).docs[0].data() as Student;

    const q = query(collection(db, "exs"), where("level", "==", user.level));

    const querySnapshot = (await getDocs(q)).docs;

    querySnapshot.forEach(async (e) => {
      var item: Ex = e.data() as Ex;
      item.id = e.id;
      item.listItems = undefined;
      exs.push(item);
    });

    return exs;
  }
);

export const getExAgain = createAsyncThunk(
  "exercise/get_ex_again",
  async (userID: string) => {
    console.log("hi");

    const exQ = query(
      collection(db, "ex_again"),
      where("userId", "==", userID)
    );

    const exAgainSnapshot = (await getDocs(exQ)).docs[0];

    const exAgain = exAgainSnapshot.data() as ExAgain;
    exAgain.id = exAgainSnapshot.id;

    return exAgain;
  }
);

export const getListUserExs = createAsyncThunk(
  "doc/getUserExs",
  async (userId: string) => {
    var exs: UserEx[] = [];

    const q = query(collection(db, "userExs"), where("userId", "==", userId));

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
        const exSnapshot = await getDoc(doc(db, "exs", exID));
        const ex = exSnapshot.data() as Ex;

        ex.id = exSnapshot.id;

        temp.id = item.id;
        temp.ex = ex;
        temp.resultList = resultList;

        if (temp.didDate)
          temp.didDate = getDate((item.data().didDate as Timestamp).seconds);

        exs = [...exs, temp];
      })
    );

    if (exs !== undefined && exs.length > 0)
      exs = exs?.sort((a, b) => getTimes(b.didDate) - getTimes(a.didDate));

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
    const snapshot = await getDoc(doc(db, "userExs", id));

    var item: UserEx = snapshot.data() as UserEx;
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
  async (data: {
    resultList: ExDetail[];
    exId: string;
    userID: string;
    title: string;
    id: string;
  }) => {
    const oldData = doc(db, "ex_again", data.id);
    await deleteDoc(oldData);

    const state =
      data.resultList.filter((i) => i.exRight === false).length > 0
        ? ExState.Doing
        : ExState.Completed;

    const snapshot = await addDoc(collection(db, "userExs"), {
      userId: data.userID,
      ex: data.exId,
      didDate: new Date(),
      state: state,
    });

    await Promise.all(
      data.resultList.map(
        async (item) =>
          await addDoc(collection(db, "userExs", snapshot.id, "resultList"), {
            ...item,
          })
      )
    );

    if (state === ExState.Doing) {
      await addDoc(collection(db, "ex_again"), {
        userId: data.userID,
        exId: data.exId,
        title: data.title,
        description: "Test again.",
        listItems: data.resultList.filter((i) => i.exRight === false),
      });
    }

    return snapshot.id;
  }
);

export const getExePercent = createAsyncThunk(
  "exercise/get_ex_percent",
  async (userID: string) => {
    const q = query(collection(db, "userExs"), where("userId", "==", userID));

    const userExIds = (await getDocs(q)).docs;

    if (userExIds.length === 0) {
      return 0;
    }

    let total = 0;
    let quantity = 0;

    await Promise.all(
      userExIds.map(async (i) => {
        const list = await getDocs(
          collection(db, "userExs", i.id, "resultList")
        );
        const docs = list.docs;

        const data = docs.map((e) => e.data() as ExDetail);

        const result =
          data.filter((i) => i.exRight === true).length / data.length;

        total += result;
        quantity++;
      })
    );

    return (total / quantity) * 100;
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
    builder.addCase(getListExsByLevel.fulfilled, (state, action) => {
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
    builder.addCase(getExAgain.fulfilled, (state, action) => {
      state.currentExAgain = action.payload;
    });
    builder.addCase(setCompleteExState.fulfilled, (state, action) => {
      state.completeID = action.payload;
    });
    builder.addCase(getExePercent.fulfilled, (state, action) => {
      state.exDashboard = action.payload;
    });
  },
});

export default exSlice.reducer;
