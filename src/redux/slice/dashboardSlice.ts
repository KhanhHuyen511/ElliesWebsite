import { createSlice, createAsyncThunk, Update } from "@reduxjs/toolkit";
import { query, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getDate } from "../../utils";
import { UpdateStudyPath } from "../../types";

interface types {
  checkedInNumber: Date[];
  completedRoutes: UpdateStudyPath[];
}

const initialState: types = {
  checkedInNumber: [],
  completedRoutes: [],
};

export const getDataStudent = createAsyncThunk(
  "dashboard/get_data_student",
  async () => {
    const q = query(collection(db, "students"));
    const querySnapshot = (await getDocs(q)).docs;

    if (querySnapshot) {
      let checkInList: any[] = [];
      let completeList: any[] = [];

      querySnapshot.map((data) => {
        let checkIn = data.data().checkinDays as any[];
        if (checkIn) {
          checkIn = checkIn.map((i: Timestamp) => getDate(i.seconds));
          checkInList.push(...checkIn);
        }

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
      });

      return { checkInList, completeList };
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
    });
  },
});

export default dashboardSlice.reducer;
