/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Markup only. Same strip + artwork split as HomeNavbar, plus a page title
 * and breadcrumb derived from the current route.
 * ========================================================================== */

import {
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Logout } from "@mui/icons-material";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDeleteAll: () => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

/** pathname -> banner title, so every inner page gets the same dark header */
const PAGE_TITLES: { path: string; title: string }[] = [
  { path: "/products", title: "Products" },
  { path: "/orders", title: "Orders" },
  { path: "/member-page", title: "My Page" },
  { path: "/help", title: "Help Center" },
  { path: "/login", title: "Login" },
  { path: "/register", title: "Register" },
];

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onDelete,
    onRemove,
    onDeleteAll,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();
  const history = useHistory();
  const location = useLocation();

  /** a single product sits one level below the products list */
  const isProductDetail = /^\/products\/[^/]+/.test(location.pathname);
  const matched = PAGE_TITLES.find((page) =>
    location.pathname.startsWith(page.path),
  );
  const title = isProductDetail
    ? "Product Detail"
    : matched
      ? matched.title
      : "NextGain";

  return (
    <div className="other-navbar">
      {/* solid bar — kept separate from the banner artwork below it */}
      <div className="ng-navbar-strip">
        <Container className="navbar-container">
          <Stack className="ng-nav">
            <NavLink to="/">
              <Box className="ng-logo">
                <span className="ng-logo-a">NEXT</span>
                <span className="ng-logo-b">GAIN</span>
              </Box>
            </NavLink>

            <Stack className="ng-nav-links">
              <NavLink exact to="/" activeClassName="underline">
                Home
              </NavLink>
              <NavLink to="/products" activeClassName="underline">
                Products
              </NavLink>
              {authMember ? (
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              ) : null}
              {authMember ? (
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              ) : null}
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Stack>

            <Stack className="ng-nav-actions">
              <IconButton
                className="ng-nav-icon"
                aria-label="search products"
                onClick={() => history.push("/products")}
              >
                <SearchIcon fontSize="small" />
              </IconButton>

              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />

              {!authMember ? (
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => history.push("/login")}
                >
                  Login
                </Button>
              ) : (
                <img
                  className="user-avatar"
                  alt={authMember.memberNick}
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/img/myPhoto.jpg"
                  }
                  aria-haspopup={"true"}
                  onClick={handleLogoutClick}
                />
              )}

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                className="ng-account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleLogoutRequest}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Container>
      </div>

      {/* banner artwork band */}
      <div className="page-hero">
        <Container>
          <Box className="page-banner">
            <h1>{title}</h1>
            <Box className="crumbs">
              <NavLink to="/">Home</NavLink>
              <span className="sep">/</span>
              {isProductDetail ? (
                <>
                  <NavLink to="/products">Products</NavLink>
                  <span className="sep">/</span>
                </>
              ) : null}
              <span>{title}</span>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}
