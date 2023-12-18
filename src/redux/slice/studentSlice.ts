import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Student } from "../../types";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { getDate } from "../../utils/utils";
import { ref, uploadBytes } from "firebase/storage";

interface types {
  currentUser?: Student;
  currentAccount?: {};
}

const initialState: types = {};

// Write reducer get Doc
export const getCurrentStudent = createAsyncThunk(
  "student/get",
  async (userID: string) => {
    var stu: Student;
    const q = query(collection(db, "students"), where("id", "==", userID));
    const querySnapshot = (await getDocs(q)).docs[0];
    stu = querySnapshot.data() as Student;

    if (querySnapshot.data().birthday)
      stu.birthday = getDate(querySnapshot.data().birthday.seconds);

    return stu;
  }
);

// Write reducer get Doc
export const getCurrentAccount = createAsyncThunk(
  "student/get_account",
  async (userID: string) => {
    const q = query(collection(db, "accounts"), where("user_id", "==", userID));
    const querySnapshot = (await getDocs(q)).docs[0];
    var account = querySnapshot.data();

    if (querySnapshot.data().create_date)
      account.create_date = getDate(querySnapshot.data().create_date.seconds);

    return account;
  }
);

export const getStudentName = createAsyncThunk(
  "student/name",
  async (userID: string) => {
    var stu: Student;
    const q = query(collection(db, "students"), where("id", "==", userID));
    const querySnapshot = (await getDocs(q)).docs[0];
    stu = querySnapshot.data() as Student;

    if (stu.name) return stu.name;
    return "";
  }
);

export const getStudentLevel = createAsyncThunk(
  "student/level",
  async (userID: string) => {
    var stu: Student;
    const q = query(collection(db, "students"), where("id", "==", userID));
    const querySnapshot = (await getDocs(q)).docs[0];
    stu = querySnapshot.data() as Student;

    if (stu.name) return stu.level;
    return "";
  }
);

export const getAccountById = createAsyncThunk(
  "student/get_student_account_by_id",
  async (userID: string) => {
    const q = query(collection(db, "accounts"), where("user_id", "==", userID));
    const querySnapshot = (await getDocs(q)).docs[0];

    return querySnapshot.data();
  }
);

export const updateCurrentStudent = createAsyncThunk(
  "student/update",
  async ({ data, oldData }: { data: Student; oldData: Student }) => {
    const q = query(collection(db, "students"), where("id", "==", data.id));
    const querySnapshot = (await getDocs(q)).docs[0];

    await updateDoc(querySnapshot.ref, {
      name: data.name ? data.name : oldData.name,
      email: data.email ? data.email : oldData.email,
      birthday: data.birthday ? data.birthday : oldData.birthday,
      gender: data.gender ? data.gender : oldData.gender,
      bio: data.bio ? data.bio : oldData.bio,
    });

    return data;
  }
);

export const updateAvatar = createAsyncThunk(
  "student/updateAvatar",
  async ({ data, newAvatar }: { data: Student; newAvatar: File }) => {
    const q = query(collection(db, "students"), where("id", "==", data.id));
    const querySnapshot = (await getDocs(q)).docs[0];

    await updateDoc(querySnapshot.ref, {
      avatar: newAvatar.name,
    });

    const imgRef = ref(storage, `images/${newAvatar.name}`);
    uploadBytes(imgRef, newAvatar);

    return { ...data, avatar: newAvatar };
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    REMOVE_ACTIVE_STUDENT: (state, action) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentStudent.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentAccount.fulfilled, (state, action) => {
      state.currentAccount = action.payload;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { REMOVE_ACTIVE_STUDENT } = studentSlice.actions;

export default studentSlice.reducer;
