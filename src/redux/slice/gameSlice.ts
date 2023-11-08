import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GameRound, UserGameRound } from "../../types";
import {
  addDoc,
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
  async ({ nameOfGame, userID }: { nameOfGame: string; userID: string }) => {
    const userQuery = query(
      collection(db, "students"),
      where("id", "==", userID)
    );
    const userSnapshot = (await getDocs(userQuery)).docs[0];

    if (userSnapshot) {
      const q = query(collection(db, "game"), where("name", "==", nameOfGame));

      const querySnapshot = (await getDocs(q)).docs[0].id;

      const querySnapshot1 = await getDocs(
        collection(db, "game", querySnapshot, "rounds")
      );

      const userGameRoundsQuery = query(
        collection(db, "userGame"),
        where("userID", "==", userID)
      );

      const userGameRoundsSnapshot = (await getDocs(userGameRoundsQuery)).docs;

      let userRoundList: UserGameRound[] = [];

      userGameRoundsSnapshot.map((item) => {
        userRoundList = [...userRoundList, item.data() as UserGameRound];
      });

      let list: any[] = [];

      querySnapshot1.docs.map((item) => {
        if (!!userRoundList.find((o) => o.gameRoundId === item.id)) {
          list = [
            ...list,
            userRoundList.find((o) => o.gameRoundId === item.id),
          ];
        } else {
          const round = item.data() as GameRound;
          let data = { ...round, id: item.id };
          list = [...list, data];
        }
      });

      return list;
    }
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

export const setAUserGameRound = createAsyncThunk(
  "game/round/set_user",
  async (data: UserGameRound) => {
    console.log("in:", data);
    await addDoc(collection(db, "user_game_rounds"), data);

    // return data;
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
