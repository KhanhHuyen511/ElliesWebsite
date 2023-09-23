import { createSlice, createAsyncThunk, Update } from "@reduxjs/toolkit";
import { query, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getDate } from "../../utils/utils";
import { BlogState, LevelType, UpdateStudyPath } from "../../types";

interface types {
  checkedInNumber: Date[];
  completedRoutes: UpdateStudyPath[];
  levelRate: number[];
  blogFigure: number[];
  accountFigure: number;
}

const initialState: types = {
  checkedInNumber: [],
  completedRoutes: [],
  levelRate: [],
  blogFigure: [],
  accountFigure: 0,
};

export const getDataStudent = createAsyncThunk(
  "dashboard/get_data_student",
  async () => {
    const q = query(collection(db, "students"));
    const querySnapshot = (await getDocs(q)).docs;

    if (querySnapshot) {
      let checkInList: any[] = [];
      let completeList: any[] = [];
      let levels = [0, 0, 0];

      querySnapshot.map((data) => {
        // get check in data
        let checkIn = data.data().checkinDays as any[];
        if (checkIn) {
          checkIn = checkIn.map((i: Timestamp) => getDate(i.seconds));
          checkInList.push(...checkIn);
        }

        // get complete data
        let complete = data.data().paths as any[];
        if (complete) {
          complete = complete.map(function (i: UpdateStudyPath) {
            return {
              ...i,
              updateDate: getDate(i.updateDate.seconds),
            };
          });
          completeList.push(...complete);
        }

        // get level data
        let level = data.data().level as LevelType;
        if (level === LevelType.Beginner) levels[0]++;
        else if (level === LevelType.Intermediate) levels[1]++;
        else levels[2]++;
      });

      return { checkInList, completeList, levels };
    }
  }
);

export const getDataAccount = createAsyncThunk(
  "dashboard/get_data_account",
  async () => {
    const q = query(collection(db, "accounts"));
    const querySnapshot = (await getDocs(q)).docs;

    if (querySnapshot) {
      let todayAccount: number = 0;

      querySnapshot.map(async (data) => {
        let studentDate = getDate(data.data().create_date.seconds);

        if (
          studentDate.toLocaleDateString() === new Date().toLocaleDateString()
        )
          todayAccount++;
      });

      return todayAccount;
    }
  }
);

export const getDataBlog = createAsyncThunk(
  "dashboard/get_data_blog",
  async () => {
    const q = query(collection(db, "forum"));
    const querySnapshot = (await getDocs(q)).docs;

    if (querySnapshot) {
      let posted: number = 0;
      let pending: number = 0;
      let today: number = 0;

      querySnapshot.map(async (data) => {
        let blogState = data.data().state as BlogState;
        if (blogState || blogState === 0) {
          switch (blogState) {
            case BlogState.Pending:
              pending++;
              break;
            case BlogState.Posted:
              posted++;
              break;
            default:
              break;
          }
        }

        let createDate = getDate(data.data().createDate.seconds);
        if (createDate.toLocaleDateString() === new Date().toLocaleDateString())
          today++;
      });

      return [posted, pending, today];
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDataStudent.fulfilled, (state, action) => {
      state.checkedInNumber = [];
      state.checkedInNumber.push(...(action.payload?.checkInList as Date[]));
      state.completedRoutes = [];
      state.completedRoutes.push(
        ...(action.payload?.completeList as UpdateStudyPath[])
      );
      state.levelRate = [];
      state.levelRate.push(...(action.payload?.levels as number[]));
    });
    builder.addCase(getDataBlog.fulfilled, (state, action) => {
      state.blogFigure = [];
      state.blogFigure.push(...(action.payload as number[]));
    });
    builder.addCase(getDataAccount.fulfilled, (state, action) => {
      state.accountFigure = action.payload as number;
    });
  },
});

export default dashboardSlice.reducer;
