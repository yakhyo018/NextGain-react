/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * NEW FILE
 *
 * One product tile, shared by Popular Products, New Arrivals, the products grid
 * and the related-products strip so all four stay identical.
 * ========================================================================== */

import { Box, Button, Stack } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useHistory } from "react-router-dom";
import { Product } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";
import { collectionLabel } from "../../../lib/data/collections";

interface ProductCardProps {
  product: Product;
  onAdd?: (item: CartItem) => void;
}

/**
 * One product tile. Shared by Popular Products, New Arrivals, the products grid
 * and the related-products row so all four stay visually identical.
 */
export default function ProductCard(props: ProductCardProps) {
  const { product, onAdd } = props;
  const history = useHistory();
  const imagePath = `${serverApi}/${product.productImages[0]}`;

  return (
    <Stack
      className="ng-card"
      onClick={() => history.push(`/products/${product._id}`)}
    >
      <Box className="ng-card-media">
        <img src={imagePath} alt={product.productName} />
        {product.productSize ? (
          <span className="ng-card-badge">{product.productSize}</span>
        ) : null}
      </Box>

      <Box className="ng-card-body">
        <span className="ng-card-kicker">
          {collectionLabel(product.productCollection)}
        </span>
        <span className="ng-card-name">{product.productName}</span>

        <Box className="ng-card-foot">
          <span className="ng-card-price">
            ${product.productPrice.toFixed(2)}
          </span>

          <Stack flexDirection="row" alignItems="center" gap="10px">
            <span className="ng-card-meta">
              <VisibilityOutlinedIcon sx={{ fontSize: 15 }} />
              {product.productViews}
            </span>
            {onAdd ? (
              <Button
                className="ng-card-cart"
                aria-label="add to cart"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd({
                    _id: product._id,
                    quantity: 1,
                    name: product.productName,
                    price: product.productPrice,
                    image: product.productImages[0],
                  });
                }}
              >
                <AddShoppingCartIcon sx={{ fontSize: 16 }} />
              </Button>
            ) : null}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
