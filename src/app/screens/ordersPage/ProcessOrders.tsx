/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Markup only -- renders through OrderBox. finishOrderHandler is untouched.
 * ========================================================================== */

import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import OrderBox from "./OrderBox";

/** REDUX SLICE & SELECTOR **/
const processOrderRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders }),
);

interface ProcessOrdersProps {
  setValue: (iput: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrderRetriever);

  // HANDLERS

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => (
          <OrderBox
            key={order._id}
            order={order}
            statusLabel="Processing"
            statusClass="ng-pill--blue"
            actions={
              <Button
                className="ng-btn ng-btn--primary"
                variant="contained"
                value={order._id}
                onClick={finishOrderHandler}
              >
                Verify to Fulfil
              </Button>
            }
          />
        ))}

        {!processOrders || processOrders.length === 0 ? (
          <Box className={"order-empty"}>
            <ReceiptLongOutlinedIcon />
            <span>Nothing is being processed right now.</span>
          </Box>
        ) : (
          <Box className={"order-count"}>
            Showing {processOrders.length} processing order
            {processOrders.length === 1 ? "" : "s"}
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
