/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 * BUG FIX -- a guest could fill the cart. onAdd now checks authMember first and
 * shows the login prompt instead. onRemove/onDelete stay open so a stale cart
 * can still be cleared.
 * ========================================================================== */

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../lib/types/search";
import { useGlobals } from "./useGlobals";
import { sweetLoginRequired } from "../../lib/sweetAlert";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);
  const { authMember } = useGlobals();
  const history = useHistory();

  /**
   * Only members may fill a cart — a guest gets the login prompt instead.
   * Returns false when the action must be stopped.
   */
  const requireMember = (): boolean => {
    if (authMember) return true;
    sweetLoginRequired().then((goToLogin) => {
      if (goToLogin) history.push("/login");
    });
    return false;
  };

  /** HANDLERS **/

  const onAdd = (input: CartItem) => {
    if (!requireMember()) return;

    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (!exist) return;

    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id,
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
