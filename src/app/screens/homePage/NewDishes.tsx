/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Now the 'New Arrivals' row, rendered with ProductCard. Selector unchanged.
 * ========================================================================== */

import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import ProductCard from "../../components/product/ProductCard";
import { Product } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR */
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

interface NewDishesProps {
  onAdd: (item: CartItem) => void;
}

export default function NewDishes(props: NewDishesProps) {
  const { onAdd } = props;
  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className="ng-section-head">
            <span className="ng-section-title">New Arrivals</span>
            <Link to="/products" className="ng-link-all">
              View All
            </Link>
          </Box>

          <Stack className={"cards-frame"}>
            {newDishes.length !== 0 ? (
              newDishes.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAdd={onAdd}
                />
              ))
            ) : (
              <Box className="no-data">New products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
