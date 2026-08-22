/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 * state.restaurant renamed to state.store to match ProductsPageState in
 * lib/types/screen.ts (the mismatch was breaking the type check), and an
 * unused moment import was removed. The reducers themselves are unchanged.
 * ========================================================================== */

import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  store: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setproducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setStore, setChosenProduct, setproducts } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
