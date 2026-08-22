/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * The 'Popular Products' row, rendered with ProductCard. Selector unchanged.
 *
 * The order comes from homePage/index.tsx, which asks the backend for
 * order=productViews; Product.service sorts every field except productPrice
 * descending, so the most-viewed product lands first.
 * ========================================================================== */

import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import ProductCard from "../../components/product/ProductCard";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

interface PopularDishesProps {
  onAdd: (item: CartItem) => void;
}

export default function PopularDishes(props: PopularDishesProps) {
  const { onAdd } = props;
  const { popularDishes } = useSelector(popularDishesRetriever);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="ng-section-head">
            <span className="ng-section-title">Popular Products</span>
            <Link to="/products" className="ng-link-all">
              View All
            </Link>
          </Box>

          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAdd={onAdd}
                />
              ))
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
