import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Doc, Ex, ExDetail, StudyCard, UserEx } from '../../types';
import { getDate } from '../../utils';

interface types {
  listExs: Ex[];
  listUserExs?: UserEx[];
  currentEx?: Ex;
}

const initialState: types = {
  listExs: [],
};

// Write reducer get Docs
export const getListExs = createAsyncThunk('doc/getExs', async () => {
  var exs: Ex[] = [];
  const querySnapshot = await getDocs(collection(db, 'exs'));

  querySnapshot.forEach(async (e) => {
    var item: Ex = e.data() as Ex;
    item.id = e.id;
    item.listItems = undefined;
    exs.push(item);
  });

  return exs;
});

export const getListUserExs = createAsyncThunk(
  'doc/getUserExs',
  async (userId: string) => {
    var exs: UserEx[] = [];

    const q = await query(
      collection(db, 'userExs'),
      where('userId', '==', userId)
    );
    await Promise.all(
      (
        await getDocs(q)
      ).docs.map(async (item) => {
        let temp: UserEx = item.data() as UserEx;

        // get result list of current user
        const querySnapshot = await getDocs(
          collection(db, 'userExs', item.id, 'resultList')
        );

        const resultList: ExDetail[] = [];

        querySnapshot.forEach(async (e) => {
          var d: ExDetail = e.data() as ExDetail;
          d.id = e.id;
          resultList.push(d);
        });

        // get ex object
        const exID = item.data().ex;
        const ex = (await (await getDoc(doc(db, 'exs', exID))).data()) as Ex;

        temp.id = item.id;
        temp.ex = ex;
        temp.resultList = resultList;

        if (temp.didDate)
          temp.didDate = getDate((item.data().didDate as Timestamp).seconds);

        exs = [...exs, temp];
      })
    );

    console.log(exs);
    return exs;
  }
);

const exSlice = createSlice({
  name: 'ex',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListExs.fulfilled, (state, action) => {
      state.listExs = action.payload as Ex[];
    });
    builder.addCase(getListUserExs.fulfilled, (state, action) => {
      state.listUserExs = action.payload as UserEx[];
    });
  },
});

export default exSlice.reducer;
