/* ==========================================================================
 * @claude-change  2026-10-20  |  Mobile layout
 * NEW
 *
 * Hamburger button + slide-in drawer that replaces the centred link row
 * below 900px (navbar.css hides .ng-nav-links there and shows this button).
 * Both HomeNavbar and OtherNavbar render it, so the links live in one place.
 * ========================================================================== */

import { useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobals } from "../../hooks/useGlobals";

export default function MobileMenu() {
  const { authMember } = useGlobals();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);
  const go = (path: string) => {
    close();
    history.push(path);
  };

  return (
    <>
      <IconButton
        className="ng-nav-icon ng-nav-burger"
        aria-label="open menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon fontSize="small" />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={close}
        className="ng-mobile-drawer"
      >
        <Box className="drawer-head">
          <Box className="ng-logo">
            <span className="ng-logo-a">NEXT</span>
            <span className="ng-logo-b">GAIN</span>
          </Box>
          <IconButton
            className="drawer-close"
            aria-label="close menu"
            onClick={close}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <nav className="drawer-links" onClick={close}>
          <NavLink exact to="/" activeClassName="is-active">
            Home
          </NavLink>
          <NavLink to="/products" activeClassName="is-active">
            Products
          </NavLink>
          {authMember ? (
            <NavLink to="/orders" activeClassName="is-active">
              Orders
            </NavLink>
          ) : null}
          {authMember ? (
            <NavLink to="/member-page" activeClassName="is-active">
              My Page
            </NavLink>
          ) : null}
          <NavLink to="/help" activeClassName="is-active">
            Help
          </NavLink>
        </nav>

        {!authMember ? (
          <Box className="drawer-auth">
            <button
              className="drawer-btn drawer-btn--primary"
              onClick={() => go("/login")}
            >
              Login
            </button>
            <button className="drawer-btn" onClick={() => go("/register")}>
              Sign Up
            </button>
          </Box>
        ) : null}
      </Drawer>
    </>
  );
}
