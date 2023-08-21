import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayRemove,
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
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Blog, BlogComment, BlogLike, BlogState, Student } from "../../types";
import { getDate } from "../../utils";

interface types {
  listBlogs: Blog[];
  listPendingBlogs?: Blog[];
  listUserBlogs?: Blog[];
  currentBlog?: Blog;
}

const initialState: types = {
  listBlogs: [],
};

export const getListBlogs = createAsyncThunk("forum/getListBlogs", async () => {
  let items: Blog[] = [];

  const querySnapshot = await getDocs(collection(db, "forum"));

  querySnapshot.forEach(async (e) => {
    var item: Blog = e.data() as Blog;
    if (item.state === BlogState.Posted) {
      item.id = e.id;
      if (item.createDate)
        item.createDate = getDate((e.data().createDate as Timestamp).seconds);
      items.push(item);
    }
  });

  return items;
});

export const getListPendingBlogs = createAsyncThunk(
  "forum/pending-blogs",
  async () => {
    let items: Blog[] = [];

    const querySnapshot = await getDocs(collection(db, "forum"));

    querySnapshot.forEach(async (e) => {
      var item: Blog = e.data() as Blog;
      if (item.state === BlogState.Pending) {
        item.id = e.id;
        if (item.createDate)
          item.createDate = getDate((e.data().createDate as Timestamp).seconds);
        items.push(item);
      }
    });

    return items;
  }
);

export const setABlog = createAsyncThunk(
  "forum/setABlog",
  async (data: Blog) => {
    await addDoc(collection(db, "forum"), data);
  }
);

export const updateBlogState = createAsyncThunk(
  "forum/update-blog-state",
  async ({
    blogId,
    newState,
    note,
  }: {
    blogId: string;
    newState: BlogState;
    note?: string;
  }) => {
    const docRef = doc(db, "forum", blogId);
    await updateDoc(docRef, {
      state: newState,
      cancelNote: note ? note : "",
    });

    return blogId;
  }
);

export const getListBlogsByUserId = createAsyncThunk(
  "forum/list_blogs_by_user_id/get",
  async (userId: string) => {
    let items: Blog[] = [];

    const blogsRef = collection(db, "forum");

    const q = query(blogsRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (e) => {
      var item: Blog = e.data() as Blog;
      item.id = e.id;
      if (item.createDate)
        item.createDate = getDate((e.data().createDate as Timestamp).seconds);
      items.push(item);
    });

    return items;
  }
);

export const getABlog = createAsyncThunk(
  "forum/getABlog",
  async (id: string) => {
    const querySnapshot = await getDoc(doc(db, "forum", id));

    var item: Blog = querySnapshot.data() as Blog;
    item.id = querySnapshot.id;
    if (item.createDate)
      item.createDate = getDate(
        (querySnapshot?.data()?.createDate as Timestamp).seconds
      );

    const userQ = query(
      collection(db, "students"),
      where("id", "==", item.userId)
    );

    const user = (await getDocs(userQ)).docs[0].data() as Student;

    if (user.name) item.userName = user.name;
    else item.userName = user.email;

    if (item.comments) {
      await Promise.all(
        item?.comments?.map(async (e) => {
          const userCmt = query(
            collection(db, "students"),
            where("id", "==", e.userId)
          );

          const snapshot = (await getDocs(userCmt)).docs[0].data();

          e.userName = snapshot.name;

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
  "forum/setAComment",
  async (data: BlogComment) => {
    await updateDoc(doc(db, "forum", data.blogId), {
      comments: arrayUnion(data),
    });

    return data;
  }
);

export const setALike = createAsyncThunk(
  "forum/setALike",
  async (data: BlogLike) => {
    await updateDoc(doc(db, "forum", data.blogId), {
      likes: arrayUnion(data),
    });

    return data;
  }
);

export const removeALike = createAsyncThunk(
  "forum/removeALike",
  async (data: BlogLike) => {
    const item = await getDoc(doc(db, "forum", data.blogId));

    const temp = item.data()?.likes as BlogLike[];

    const temp1 = temp.find((o) => o.userId === data.userId);

    await updateDoc(doc(db, "forum", data.blogId), {
      likes: arrayRemove(temp1),
    });

    return data;
  }
);

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListBlogs.fulfilled, (state, action) => {
      state.listBlogs = action.payload;
    });
    builder.addCase(getListPendingBlogs.fulfilled, (state, action) => {
      state.listPendingBlogs = action.payload;
    });
    builder.addCase(getListBlogsByUserId.fulfilled, (state, action) => {
      state.listUserBlogs = action.payload;
    });
    builder.addCase(getABlog.fulfilled, (state, action) => {
      state.currentBlog = action.payload;
    });
    builder.addCase(updateBlogState.fulfilled, (state, action) => {
      state.listPendingBlogs?.filter((o) => o.id !== action.payload);
    });
    builder.addCase(setAComment.fulfilled, (state, action) => {
      state.currentBlog?.comments?.unshift(action.payload);
    });
    builder.addCase(setALike.fulfilled, (state, action) => {
      state.currentBlog?.likes?.unshift(action.payload);
    });
    builder.addCase(removeALike.fulfilled, (state, action) => {
      state.currentBlog?.likes?.splice(
        state.currentBlog.likes.indexOf(action.payload),
        1
      );
    });
  },
});

export default forumSlice.reducer;
