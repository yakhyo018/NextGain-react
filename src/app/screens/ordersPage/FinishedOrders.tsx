/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Markup only -- renders through OrderBox.
 * ========================================================================== */

import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Order } from "../../../lib/types/order";
import OrderBox from "./OrderBox";

/** REDUX SLICE & SELECTOR **/
const finishedOrderRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders }),
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrderRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => (
          <OrderBox
            key={order._id}
            order={order}
            statusLabel="Delivered"
            statusClass="ng-pill--green"
          />
        ))}

        {!finishedOrders || finishedOrders.length === 0 ? (
          <Box className={"order-empty"}>
            <ReceiptLongOutlinedIcon />
            <span>No finished orders yet.</span>
          </Box>
        ) : (
          <Box className={"order-count"}>
            Showing {finishedOrders.length} finished order
            {finishedOrders.length === 1 ? "" : "s"}
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
