/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * NEW FILE
 *
 * A navbar used only by /login and /register. Deliberately NOT the shared
 * OtherNavbar: the auth pages sit on a full-bleed photo, carry no cart state
 * and show the page name where the wordmark normally goes.
 *
 * @claude-change  2026-11-10  |  Soft Pastel redesign
 * The pastel logo now sits on the left (it links home) with the breadcrumb
 * as a pill next to it; the page name stays as the last crumb.
 * ========================================================================== */

import { Box, Container, IconButton, Stack } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

interface AuthNavbarProps {
  /** shown large on the left and as the last breadcrumb */
  title: string;
}

export default function AuthNavbar(props: AuthNavbarProps) {
  const { title } = props;
  const history = useHistory();

  return (
    <div className="auth-navbar">
      <Container>
        <Stack className="bar">
          <Stack className="bar-left">
            <NavLink to="/" className="page-title" aria-label="NextGain home">
              <Box className="ng-logo">
                <span className="ng-logo-a">next</span><span className="ng-logo-b">gain</span>
              </Box>
            </NavLink>

            <Box className="crumbs">
              <NavLink to="/">Home</NavLink>
              <span className="sep">/</span>
              <span>{title}</span>
            </Box>
          </Stack>

          <Stack className="bar-actions">
            <IconButton
              className="ng-nav-icon"
              aria-label="search products"
              onClick={() => history.push("/products")}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
            <IconButton
              className="ng-nav-icon"
              aria-label="go to products"
              onClick={() => history.push("/products")}
            >
              <ShoppingBagOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              className="ng-nav-icon"
              aria-label="account"
              onClick={() => history.push("/login")}
            >
              <PersonOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
