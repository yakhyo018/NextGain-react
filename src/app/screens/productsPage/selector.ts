/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 * retrieveRestaurant renamed to retrieveStore, to follow the slice.
 * ========================================================================== */

import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveStore = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.store,
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct,
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products,
);
