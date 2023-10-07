import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { StudyCard, GameRound } from "../../types";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

interface types {
  rounds?: GameRound[];
}

const initialState: types = {
  rounds: [],
};

export const getAllGameRounds = createAsyncThunk(
  "game/rounds/get",
  async (nameOfGame: string) => {
    const q = query(collection(db, "game"), where("name", "==", "Go home!"));

    const querySnapshot = (await getDocs(q)).docs[0].id;

    const querySnapshot1 = await getDocs(
      collection(db, "game", querySnapshot, "rounds")
    );

    let list: GameRound[] = [];

    querySnapshot1.docs.map((item) => {
      list = [...list, item.data() as GameRound];
    });

    return list;
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGameRounds.fulfilled, (state, action) => {
      state.rounds = action.payload;
    });
  },
});

export default gameSlice.reducer;
