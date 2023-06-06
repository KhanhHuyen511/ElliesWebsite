import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Blog, BlogComment, Student } from '../../types';
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

    if (item.comments) {
      await Promise.all(
        item?.comments?.map(async (e) => {
          const userCmt = query(
            collection(db, 'students'),
            where('id', '==', e.userId)
          );

          const snapshot = (await getDocs(userCmt)).docs[0].data();

          e.userName = snapshot.name;

          console.log(e);

          if (e.createDate)
            e.createDate = getDate(
              (e.createDate as unknown as Timestamp).seconds
            );
        })
      );

      const sorted = [...item.comments].sort(
        (a, b) => b.createDate.getTime() - a.createDate.getTime()
      );

      item.comments = sorted;
    }

    return item;
  }
);

export const setAComment = createAsyncThunk(
  'forum/setAComment',
  async (data: BlogComment) => {
    await updateDoc(doc(db, 'forum', data.blogId), {
      comments: arrayUnion(data),
    });

    return data;
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
    builder.addCase(setAComment.fulfilled, (state, action) => {
      state.currentBlog?.comments?.unshift(action.payload);
    });
  },
});

export default forumSlice.reducer;
