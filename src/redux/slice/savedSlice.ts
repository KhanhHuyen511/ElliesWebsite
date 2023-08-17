import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { StudyCard } from "../../types";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

interface types {
  savedList: StudyCard[];
}

const initialState: types = {
  savedList: [],
};

export const addToSaved = createAsyncThunk(
  "saved/add",
  async ({ card, userId }: { card: StudyCard; userId: string }) => {
    const q = query(collection(db, "students"), where("id", "==", userId));
    const querySnapshot = (await getDocs(q)).docs[0];
    let userSaved = querySnapshot.data().savedList as StudyCard[];

    if (!userSaved) userSaved = [];

    await updateDoc(querySnapshot.ref, {
      savedList: [...userSaved, card],
    });

    return card;
  }
);

export const removeFromSaved = createAsyncThunk(
  "saved/remove",
  async ({ cardId, userId }: { cardId: string; userId: string }) => {
    const q = query(collection(db, "students"), where("id", "==", userId));
    const querySnapshot = (await getDocs(q)).docs[0];
    let userSaved = (await querySnapshot.data().savedList) as StudyCard[];

    if (!userSaved) return;

    await updateDoc(querySnapshot.ref, {
      savedList: userSaved.filter((o) => o.id !== cardId),
    });

    return cardId;
  }
);

const savedSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToSaved.fulfilled, (state, action) => {
      state.savedList.push(action.payload);
    });
  },
});

export default savedSlice.reducer;
