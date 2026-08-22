/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * NEW FILE
 *
 * Presentation of one order, shared by all three tabs; only the status pill
 * and the action buttons differ between them.
 * ========================================================================== */

import { ReactNode } from "react";
import { Box } from "@mui/material";
import moment from "moment";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";

interface OrderBoxProps {
  order: Order;
  /** small coloured pill shown next to the order id */
  statusLabel: string;
  statusClass: string;
  /** buttons rendered on the right of the order footer */
  actions?: ReactNode;
}

/**
 * Presentation of a single order — identical across the paused, processing
 * and finished tabs, only the pill and the actions differ.
 */
export default function OrderBox(props: OrderBoxProps) {
  const { order, statusLabel, statusClass, actions } = props;
  const itemCount = order?.orderItems?.length ?? 0;

  return (
    <Box className={"order-main-box"}>
      <Box className={"order-head"}>
        <Box>
          <span className={"order-id"}>
            Order #{order._id.slice(-6).toUpperCase()}
          </span>
          <Box className={"order-date"}>
            {moment(order.createdAt).format("MMM DD, YYYY · HH:mm")} ·{" "}
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </Box>
        </Box>
        <span className={`ng-pill ${statusClass}`}>{statusLabel}</span>
      </Box>

      <Box className={"order-box-scroll ng-scroll"}>
        {order?.orderItems?.map((item: OrderItem) => {
          const product: Product = order.productData.filter(
            (ele: Product) => item.productId === ele._id,
          )[0];
          if (!product) return null;
          const imagePath = `${serverApi}/${product.productImages[0]}`;
          return (
            <Box key={item._id} className={"orders-name-price"}>
              <img
                src={imagePath}
                alt={product.productName}
                className={"order-dish-img"}
              />
              <p className={"title-dish"}>{product.productName}</p>
              <Box className={"price-box"}>
                <span>
                  ${item.itemPrice} × {item.itemQuantity}
                </span>
                <span className={"line-total"}>
                  ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                </span>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box className={"total-price-box"}>
        <Box className={"box-total"}>
          <span>
            Products
            <b className={"amount"}>
              ${(order.orderTotal - order.orderDelivery).toFixed(2)}
            </b>
          </span>
          <span>
            Delivery
            <b className={"amount"}>${order.orderDelivery.toFixed(2)}</b>
          </span>
          <span>
            Total
            <b className={"grand"}>${order.orderTotal.toFixed(2)}</b>
          </span>
        </Box>
        {actions ? <Box className={"order-actions"}>{actions}</Box> : null}
      </Box>
    </Box>
  );
}
