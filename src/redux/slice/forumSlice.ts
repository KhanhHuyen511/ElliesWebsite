import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  getDocs,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Blog } from '../../types';
import { getDate } from '../../utils';

interface types {
  listBlogs: Blog[];
}

const initialState: types = {
  listBlogs: [],
};

export const getListBlogs = createAsyncThunk('forum/getListBlogs', async () => {
  let items: Blog[] = [];

  const querySnapshot = await getDocs(collection(db, 'forum'));

  querySnapshot.forEach(async (e) => {
    var item: Blog = e.data() as Blog;
    item.id = e.id;
    if (item.createDate)
      item.createDate = getDate((e.data().createDate as Timestamp).seconds);
    items.push(item);
  });

  return items;
});

export const setABlog = createAsyncThunk(
  'forum/setABlog',
  async (data: Blog) => {
    await addDoc(collection(db, 'forum'), data);
  }
);

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListBlogs.fulfilled, (state, action) => {
      state.listBlogs = action.payload;
    });
  },
});

export default forumSlice.reducer;
