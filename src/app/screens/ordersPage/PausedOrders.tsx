/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Markup only -- renders through OrderBox. deleteOrderHandler and
 * processOrderHandler are untouched.
 * ========================================================================== */

import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import OrderBox from "./OrderBox";

/** REDUX SLICE & SELECTOR **/
const pausedOrderRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

interface PausedOrdersProps {
  setValue: (iput: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrderRetriever);

  // HANDLERS

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      //PAYMENT PROCESS
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you want to proceed with your payment?",
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => (
          <OrderBox
            key={order._id}
            order={order}
            statusLabel="Preparing"
            statusClass="ng-pill--amber"
            actions={
              <>
                <Button
                  value={order._id}
                  className="ng-btn ng-btn--danger"
                  variant="outlined"
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  className="ng-btn ng-btn--primary"
                  variant="contained"
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </>
            }
          />
        ))}

        {!pausedOrders || pausedOrders.length === 0 ? (
          <Box className={"order-empty"}>
            <ReceiptLongOutlinedIcon />
            <span>No paused orders yet.</span>
          </Box>
        ) : (
          <Box className={"order-count"}>
            Showing {pausedOrders.length} paused order
            {pausedOrders.length === 1 ? "" : "s"}
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
