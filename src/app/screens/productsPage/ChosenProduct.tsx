/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Thumbnail gallery, info column, description panel and related products.
 *   - setRestaurant/retrieveRestaurant renamed to setStore/retrieveStore
 *   - related products are fetched from the same collection
 *   - Buy Now no longer navigates when the visitor is a guest
 * ========================================================================== */

import { useEffect, useState } from "react";
import { Container, Stack, Box, Button } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { setChosenProduct, setStore } from "./slice";
import { Product } from "../../../lib/types/product";
import { retrieveChosenProduct, retrieveStore } from "./selector";
import { useHistory, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { collectionLabel } from "../../../lib/data/collections";
import ProductCard from "../../components/product/ProductCard";
import { useGlobals } from "../../hooks/useGlobals";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setStore: (data: Member) => dispatch(setStore(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct }),
);
const storeRetriever = createSelector(retrieveStore, (store) => ({ store }));

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const history = useHistory();
  const { authMember } = useGlobals();
  const { setStore, setChosenProduct } = actionDispatch(useDispatch());
  const { store } = useSelector(storeRetriever);
  const { chosenProduct } = useSelector(chosenProductRetriever);

  const [activeImage, setActiveImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);

    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setStore(data))
      .catch((err) => console.log(err));
  }, [productId]);

  /** related products — same collection, current product excluded */
  useEffect(() => {
    if (!chosenProduct) return;
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 5,
        order: "productViews",
        productCollection: chosenProduct.productCollection,
      })
      .then((data) =>
        setRelated(
          data.filter((ele: Product) => ele._id !== chosenProduct._id).slice(0, 4),
        ),
      )
      .catch((err) => console.log(err));
  }, [chosenProduct?._id]);

  /** HANDLERS */
  const addToCart = () => {
    // a guest gets a single call, which is enough to raise the login prompt
    const times = authMember ? quantity : 1;
    for (let i = 0; i < times; i++) {
      onAdd({
        _id: chosenProduct!._id,
        quantity: 1,
        name: chosenProduct!.productName,
        price: chosenProduct!.productPrice,
        image: chosenProduct!.productImages[0],
      });
    }
  };

  const buyNow = () => {
    addToCart();
    // onAdd shows the login prompt for guests, so only members go further
    if (authMember) history.push("/orders");
  };

  if (!chosenProduct) return null;

  const images = chosenProduct.productImages ?? [];
  const mainImage = `${serverApi}/${images[activeImage] ?? images[0]}`;
  const inStock = chosenProduct.productLeftCount > 0;

  return (
    <div className={"chosen-product"}>
      <Container>
        <Stack className={"product-container"}>
          {/* ---------- gallery ---------- */}
          <Stack className={"chosen-product-slider"}>
            {images.length > 1 ? (
              <Stack className={"thumbs"}>
                {images.map((ele: string, index: number) => (
                  <button
                    key={index}
                    className={
                      index === activeImage ? "thumb is-active" : "thumb"
                    }
                    onClick={() => setActiveImage(index)}
                    aria-label={`image ${index + 1}`}
                  >
                    <img src={`${serverApi}/${ele}`} alt="" />
                  </button>
                ))}
              </Stack>
            ) : null}

            <Box className={"main-image"}>
              <img src={mainImage} alt={chosenProduct.productName} />
            </Box>
          </Stack>

          {/* ---------- info ---------- */}
          <Stack className={"chosen-product-info"}>
            <Box className={"info-box"}>
              <span className={"resto-name"}>
                {store?.memberNick ?? collectionLabel(chosenProduct.productCollection)}
              </span>
              <strong className={"product-name"}>
                {chosenProduct.productName}
              </strong>

              <Box className={"meta-row"}>
                <span className={"product-view"}>
                  <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                  {chosenProduct.productViews} views
                </span>
                <span
                  className={inStock ? "ng-pill ng-pill--green" : "ng-pill ng-pill--grey"}
                >
                  {inStock
                    ? `In stock · ${chosenProduct.productLeftCount} left`
                    : "Out of stock"}
                </span>
              </Box>

              <Box className={"product-price"}>
                ${chosenProduct.productPrice.toFixed(2)}
              </Box>

              <Box className={"option-block"}>
                <Box className={"option-label"}>
                  Size: <span>{chosenProduct.productSize}</span>
                </Box>
                <Box className={"option-label"} sx={{ mt: "16px" }}>
                  Quantity
                </Box>
                <Box className={"qty-stepper"}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="decrease"
                  >
                    −
                  </button>
                  <span className={"qty-val"}>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="increase"
                  >
                    +
                  </button>
                </Box>
              </Box>

              <Box className={"button-box"}>
                <Button
                  className="ng-btn ng-btn--primary"
                  variant="contained"
                  disabled={!inStock}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  className="ng-btn ng-btn--ghost"
                  variant="outlined"
                  disabled={!inStock}
                  onClick={buyNow}
                >
                  Buy Now
                </Button>
              </Box>

              <Box className={"trust-row"}>
                <span className={"trust"}>
                  <VerifiedOutlinedIcon />
                  100% Authentic
                </span>
                <span className={"trust"}>
                  <LocalShippingOutlinedIcon />
                  Fast Shipping
                </span>
                <span className={"trust"}>
                  <ReplayOutlinedIcon />
                  Easy Returns
                </span>
              </Box>
            </Box>
          </Stack>
        </Stack>

        {/* ---------- description ---------- */}
        <Box className={"detail-panel"}>
          <h3>Description</h3>
          <p className={"product-desc"}>
            {chosenProduct.productDesc
              ? chosenProduct.productDesc
              : "No description has been added for this product yet."}
          </p>

          <Box className={"spec-grid"}>
            <dl className={"spec"}>
              <dt>Category</dt>
              <dd>{collectionLabel(chosenProduct.productCollection)}</dd>
            </dl>
            <dl className={"spec"}>
              <dt>Size</dt>
              <dd>{chosenProduct.productSize}</dd>
            </dl>
            <dl className={"spec"}>
              <dt>In stock</dt>
              <dd>{chosenProduct.productLeftCount}</dd>
            </dl>
            <dl className={"spec"}>
              <dt>Views</dt>
              <dd>{chosenProduct.productViews}</dd>
            </dl>
          </Box>
        </Box>

        {/* ---------- related ---------- */}
        {related.length !== 0 ? (
          <Box className={"related-frame"}>
            <Box className="ng-section-head">
              <span className="ng-section-title">Related Products</span>
            </Box>
            <Box className={"related-grid"}>
              {related.map((product: Product) => (
                <ProductCard key={product._id} product={product} onAdd={onAdd} />
              ))}
            </Box>
          </Box>
        ) : null}
      </Container>
    </div>
  );
}
