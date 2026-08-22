/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * NEW FILE
 *
 * Display labels and ordering for ProductCollection, so the sidebar and the
 * product cards never print raw enum values.
 * ========================================================================== */

import { ProductCollection } from "../enums/product.enum";

/** Human-readable labels for the collections the backend actually returns. */
export const COLLECTION_LABELS: Record<ProductCollection, string> = {
  [ProductCollection.PROTEIN]: "Whey Protein",
  [ProductCollection.CREATINE]: "Creatine",
  [ProductCollection.MASS_GAINER]: "Mass Gainer",
  [ProductCollection.PRE_WORKOUT]: "Pre-Workout",
  [ProductCollection.OTHER]: "Accessories",
};

/** Order the sidebar / filter chips are rendered in. */
export const COLLECTION_ORDER: ProductCollection[] = [
  ProductCollection.PROTEIN,
  ProductCollection.CREATINE,
  ProductCollection.MASS_GAINER,
  ProductCollection.PRE_WORKOUT,
  ProductCollection.OTHER,
];

export const collectionLabel = (collection?: ProductCollection): string =>
  collection ? (COLLECTION_LABELS[collection] ?? "Supplement") : "Supplement";
