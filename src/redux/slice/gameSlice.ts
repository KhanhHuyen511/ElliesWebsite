import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GameRound } from "../../types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

interface types {
  rounds?: GameRound[];
  currentRound?: GameRound;
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
      let data = { ...(item.data() as GameRound), id: item.id };
      list = [...list, data];
    });

    return list;
  }
);

export const getAGameRound = createAsyncThunk(
  "game/round/get",
  async ({ nameOfGame, id }: { nameOfGame: string; id: string }) => {
    const q = query(collection(db, "game"), where("name", "==", "Go home!"));

    const querySnapshot = (await getDocs(q)).docs[0].id;

    const roundSnapshot = await getDoc(
      doc(db, "game", querySnapshot, "rounds", id)
    );

    const item = roundSnapshot.data() as GameRound;
    item.id = roundSnapshot.id;

    return item;
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
    builder.addCase(getAGameRound.fulfilled, (state, action) => {
      state.currentRound = action.payload;
    });
  },
});

export default gameSlice.reducer;
