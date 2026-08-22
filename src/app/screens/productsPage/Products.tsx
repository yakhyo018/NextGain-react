/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Filter sidebar (search + categories) and a four-column grid.
 *   - the category buttons now use the real enum values via lib/data/collections
 *   - 'Our Family Brands' and the Google Maps iframe were removed: restaurant
 *     leftovers that are not part of the design
 * The service call, redux slice and pagination logic are unchanged.
 * ========================================================================== */

import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { setproducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { COLLECTION_ORDER, collectionLabel } from "../../../lib/data/collections";
import { CartItem } from "../../../lib/types/search";
import ProductCard from "../../components/product/ProductCard";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setproducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const SORTS: { key: string; label: string }[] = [
  { key: "createdAt", label: "Newest" },
  { key: "productPrice", label: "Price" },
  { key: "productViews", label: "Popular" },
];

interface ProductPageProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductPageProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */

  const searchCollectionHandler = (collection?: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack className={"shop-layout"}>
          {/* ---------------- sidebar ---------------- */}
          <Stack className={"shop-sidebar"}>
            <Box className={"filter-card"}>
              <Box className={"filter-title"}>Search</Box>
              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Search products"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className={"single-button-search"}
                  variant="contained"
                  onClick={searchProductHandler}
                  aria-label="search"
                >
                  <SearchIcon sx={{ fontSize: 17 }} />
                </Button>
              </Stack>
            </Box>

            <Box className={"filter-card"}>
              <Box className={"filter-title"}>Categories</Box>
              <Stack className={"category-list"}>
                <button
                  className={!productSearch.productCollection ? "is-active" : ""}
                  onClick={() => searchCollectionHandler(undefined)}
                >
                  All Products
                </button>
                {COLLECTION_ORDER.map((collection) => (
                  <button
                    key={collection}
                    className={
                      productSearch.productCollection === collection
                        ? "is-active"
                        : ""
                    }
                    onClick={() => searchCollectionHandler(collection)}
                  >
                    {collectionLabel(collection)}
                  </button>
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* ---------------- results ---------------- */}
          <Stack className={"list-category-section"}>
            <Box className={"shop-toolbar"}>
              <span className={"result-count"}>
                {products.length} product{products.length === 1 ? "" : "s"} on
                this page
              </span>
              <Stack className={"dishes-filter-box"}>
                <span className={"sort-label"}>Sort by:</span>
                {SORTS.map((sort) => (
                  <button
                    key={sort.key}
                    className={
                      productSearch.order === sort.key
                        ? "ng-chip is-active"
                        : "ng-chip"
                    }
                    onClick={() => searchOrderHandler(sort.key)}
                  >
                    {sort.label}
                  </button>
                ))}
              </Stack>
            </Box>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAdd={onAdd}
                  />
                ))
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>

            <Stack className={"pagination-section"}>
              <Pagination
                count={
                  products.length !== 0
                    ? productSearch.page + 1
                    : productSearch.page
                }
                page={productSearch.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                  />
                )}
                onChange={paginationHandler}
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
