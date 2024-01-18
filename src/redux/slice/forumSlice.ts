import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Blog, BlogComment, BlogLike, BlogState, Student } from "../../types";
import { getDate } from "../../utils/utils";

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
  "forum/set_blog",
  async (data: Blog) => {
    await addDoc(collection(db, "forum"), data);
  }
);

export const updateABlog = createAsyncThunk(
  "forum/update_blog",
  async ({ newData }: { newData: Blog; note?: string }) => {
    const docRef = doc(db, "forum", newData.id);
    await updateDoc(docRef, { ...newData });

    return newData;
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

    const querySnapshot1 = await getDocs(
      collection(db, "forum", id, "comments")
    );

    let comments: BlogComment[] = [];

    querySnapshot1.forEach(async (i) => {
      let item = i.data() as BlogComment;
      if (item.createDate)
        item.createDate = getDate(
          (item.createDate as unknown as Timestamp).seconds
        );
      if (comments) comments = [...comments, item];
      else comments = [item];
    });

    item.comments = comments.sort(function (a, b) {
      if (a.isPinned) return -1;
      return 0;
    });

    return item;
  }
);

export const deleteBlog = createAsyncThunk(
  "forum/delete_blog",
  async (blogId: string) => {
    const docRef = doc(db, "forum", blogId);
    await deleteDoc(docRef);
  }
);

export const setAComment = createAsyncThunk(
  "forum/setAComment",
  async (data: BlogComment) => {
    await addDoc(collection(db, "forum", data.blogId, "comments"), data).then(
      async (d) =>
        await updateDoc(doc(db, "forum", data.blogId, "comments", d.id), {
          id: d.id,
        })
    );

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

export const removeAComment = createAsyncThunk(
  "forum/removeAComment",
  async (data: BlogComment) => {
    await deleteDoc(doc(db, "forum", data.blogId, "comments", data.id));

    return data;
  }
);

export const pinAComment = createAsyncThunk(
  "forum/pin_a_comment",
  async (data: BlogComment) => {
    await updateDoc(doc(db, "forum", data.blogId, "comments", data.id), {
      isPinned: true,
    });

    return data;
  }
);

export const unPinAComment = createAsyncThunk(
  "forum/un_pin_a_comment",
  async (data: BlogComment) => {
    await updateDoc(doc(db, "forum", data.blogId, "comments", data.id), {
      isPinned: false,
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
    builder.addCase(removeAComment.fulfilled, (state, action) => {
      state.currentBlog?.comments?.splice(
        state.currentBlog.comments.indexOf(action.payload),
        1
      );
    });
  },
});

export default forumSlice.reducer;
