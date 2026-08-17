import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      // state homepagestateni ichidagi malumot
      state.popularDishes = Array.isArray(action.payload) ? action.payload : [];
    },
    setNewDishes: (state, action) => {
      // action useefefectni ichidagi data malumot
      state.newDishes = Array.isArray(action.payload) ? action.payload : [];
    },
    setTopUsers: (state, action) => {
      state.topUsers = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
