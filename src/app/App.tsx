/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 * Presentation wiring only, the handlers are unchanged:
 *   - /login and /register routes added, the auth modal removed
 *   - HomePage now receives onAdd so home cards can fill the cart
 *   - the cart is emptied on logout
 * ========================================================================== */

import { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import LoginPage from "./screens/authPage/Login";
import RegisterPage from "./screens/authPage/Register";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import useBasket from "./hooks/useBasket";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS **/
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("Success", 700);
      setAuthMember(null);
      // the cart belongs to the member, so it leaves with them
      onDeleteAll();
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };

  const navProps = {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    anchorEl,
    handleLogoutClick,
    handleCloseLogout,
    handleLogoutRequest,
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar {...navProps} />
      ) : (
        <OtherNavbar {...navProps} />
      )}

      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/">
          <HomePage onAdd={onAdd} />
        </Route>
      </Switch>

      <Footer />
    </>
  );
}

export default App;
