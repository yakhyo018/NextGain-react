/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Markup only. The bar is now its own solid strip with the links centred,
 * and the hero artwork sits in a separate band below it. The logo is a text
 * wordmark because /icons/nextgain.svg does not exist in public/.
 * Login / Sign Up navigate to the new auth pages instead of opening a modal.
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
import { NavLink, useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import BoltIcon from "@mui/icons-material/Bolt";
import { Logout } from "@mui/icons-material";
import Basket from "./Basket";
import MobileMenu from "./MobileMenu";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

interface HomeNavbarProps {
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

export default function HomeNavbar(props: HomeNavbarProps) {
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

  return (
    <div className="home-navbar">
      {/* solid bar — kept separate from the hero artwork below it */}
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

              <MobileMenu />

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

      {/* hero artwork band */}
      <div className="home-hero">
        <Container>
          <Stack className="header-frame">
            <Box className="head-main-txt">
              Fuel your
              <br />
              best <em>performance</em>
            </Box>
            <Box className="wel-txt">
              Premium supplements for strength, recovery and results — sourced
              from the brands athletes actually train on.
            </Box>
            <Box className="service-txt">
              <BoltIcon sx={{ fontSize: 15 }} />
              24 hours service
            </Box>
            <Box className="signup">
              <Button
                variant="contained"
                className="signup-button"
                onClick={() =>
                  history.push(authMember ? "/products" : "/register")
                }
              >
                {authMember ? "Shop Now" : "Sign Up"}
              </Button>
            </Box>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
