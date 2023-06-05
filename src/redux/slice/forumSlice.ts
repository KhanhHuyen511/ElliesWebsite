import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Blog, Student } from '../../types';
import { getDate } from '../../utils';

interface types {
  listBlogs: Blog[];
  currentBlog?: Blog;
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

export const getABlog = createAsyncThunk(
  'forum/getABlog',
  async (id: string) => {
    const querySnapshot = await getDoc(doc(db, 'forum', id));

    var item: Blog = querySnapshot.data() as Blog;
    item.id = querySnapshot.id;
    if (item.createDate)
      item.createDate = getDate(
        (querySnapshot?.data()?.createDate as Timestamp).seconds
      );

    const userQ = query(
      collection(db, 'students'),
      where('id', '==', item.userId)
    );

    const user = (await getDocs(userQ)).docs[0].data() as Student;

    if (user.name) item.userName = user.name;
    else item.userName = user.email;

    return item;
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
    builder.addCase(getABlog.fulfilled, (state, action) => {
      state.currentBlog = action.payload;
    });
  },
});

export default forumSlice.reducer;
