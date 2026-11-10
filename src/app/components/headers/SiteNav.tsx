/* ==========================================================================
 * @claude-change  2026-11-10  |  Soft Pastel redesign
 * NEW FILE
 *
 * The top bar shared by HomeNavbar and OtherNavbar: logo, pill-shaped link
 * switcher, round search / cart buttons and the Login pill or avatar.
 * It used to be copied in both navbars; the handlers come in unchanged.
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
import { Logout } from "@mui/icons-material";
import Basket from "./Basket";
import MobileMenu from "./MobileMenu";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

export interface SiteNavProps {
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

export default function SiteNav(props: SiteNavProps) {
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
    <div className="ng-navbar-strip">
      <Container className="navbar-container">
        <Stack className="ng-nav">
          <NavLink to="/" aria-label="NextGain home">
            <Box className="ng-logo">
              <span className="ng-logo-a">next</span><span className="ng-logo-b">gain</span>
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
              className="ng-nav-icon ng-nav-search"
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
  );
}
