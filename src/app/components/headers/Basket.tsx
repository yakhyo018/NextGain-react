/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Markup only -- the cart drawer now shows subtotal / shipping / total and a
 * quantity stepper. proceedOrderHandler and the OrderService call are untouched.
 * ========================================================================== */

import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onDelete, onRemove, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  );
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(2);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box>
      <IconButton
        className="ng-nav-icon"
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length}>
          <ShoppingBagOutlinedIcon fontSize="small" />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="cart-menu"
        className="ng-cart-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"cart-head"}>
            <span className={"cart-title"}>Your Cart ({cartItems.length})</span>
            {cartItems.length !== 0 ? (
              <span className={"clear-all"} onClick={() => onDeleteAll()}>
                <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                Clear all
              </span>
            ) : null}
          </Box>

          {cartItems.length === 0 ? (
            <Box className={"cart-empty"}>Your cart is empty.</Box>
          ) : (
            <Box className={"orders-wrapper ng-scroll"}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    <img src={imagePath} alt={item.name} className={"product-img"} />
                    <Box className={"item-text"}>
                      <span className={"product-name"}>{item.name}</span>
                      <p className={"product-price"}>
                        ${item.price.toFixed(2)}
                      </p>
                    </Box>
                    <Box className={"qty-box"}>
                      <button onClick={() => onRemove(item)} aria-label="remove one">
                        −
                      </button>
                      <span className={"qty-val"}>{item.quantity}</span>
                      <button onClick={() => onAdd(item)} aria-label="add one">
                        +
                      </button>
                    </Box>
                    <div
                      onClick={() => onDelete(item)}
                      className={"cancel-btn"}
                      aria-label="remove item"
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </div>
                  </Box>
                );
              })}
            </Box>
          )}

          {cartItems.length !== 0 ? (
            <Box className={"basket-order"}>
              <Box className={"sum-row"}>
                <span>Subtotal</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </Box>
              <Box className={"sum-row"}>
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </Box>
              <Box className={"sum-row total"}>
                <span>Total</span>
                <span>${totalPrice}</span>
              </Box>
              <Button onClick={proceedOrderHandler} variant={"contained"}>
                Checkout
              </Button>
            </Box>
          ) : null}
        </Stack>
      </Menu>
    </Box>
  );
}
