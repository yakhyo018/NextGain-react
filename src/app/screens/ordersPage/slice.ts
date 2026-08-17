import { createSlice } from "@reduxjs/toolkit";
import { OrderPageState } from "../../../lib/types/screen";

const initialState: OrderPageState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const orderPageSlice = createSlice({
  name: "OrderPage",
  initialState,
  reducers: {
    setPauseOrders: (state, action) => {
      // state homepagestateni ichidagi malumot
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      // action useefefectni ichidagi data malumot
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setPauseOrders, setProcessOrders, setFinishedOrders } =
  orderPageSlice.actions;

const OrderPageReducer = orderPageSlice.reducer;
export default OrderPageReducer;
