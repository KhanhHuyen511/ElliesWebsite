import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Doc, StudyCard } from '../../types';
import { getDate } from '../../utils';

interface types {
  listDocs: Doc[];
}

const initialState: types = {
  listDocs: [],
};

// const abc = async (list: []) => {
//   if (list.length > 0) {
//     let items: StudyCard[] = [];
//     list.forEach(async (dataID: string) => {
//       await getDoc(doc(db, 'vocabs', dataID)).then((d) => {
//         items = [...items, d.data() as StudyCard];
//       });
//     });

//     console.log(items);
//     return items;
//   }
//   return undefined;
// };

// Write reducer get Docs
export const getListDocs = createAsyncThunk('doc/getDocs', async () => {
  var docs: Doc[] = [];
  const querySnapshot = await getDocs(collection(db, 'docs'));

  querySnapshot.forEach(async (e) => {
    var item: Doc = e.data() as Doc;
    item.id = e.id;
    item.listItems = undefined;
    if (item.createDate)
      item.createDate = getDate((e.data().createDate as Timestamp).seconds);
    docs.push(item);
  });

  console.log(docs);

  return docs;
});

const docSlice = createSlice({
  name: 'doc',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListDocs.fulfilled, (state, action) => {
      state.listDocs = action.payload as Doc[];
    });
  },
});

export default docSlice.reducer;
