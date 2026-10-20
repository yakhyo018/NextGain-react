/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 *   - tab labels now carry the live order counts
 *   - the fake payment-card sidebar was removed, orders run full width
 * The three OrderService calls and the redux wiring are unchanged.
 * ========================================================================== */

import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { Dispatch } from "@reduxjs/toolkit";
import { setPauseOrders, setProcessOrders, setFinishedOrders } from "./slice";
import "../../../css/order.css";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveFinishedOrders,
  retrievePausedOrders,
  retrieveProcessOrders,
} from "./selector";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPauseOrders: (data: Order[]) => dispatch(setPauseOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const countsRetriever = createSelector(
  retrievePausedOrders,
  retrieveProcessOrders,
  retrieveFinishedOrders,
  (paused, process, finished) => ({
    pausedCount: paused?.length ?? 0,
    processCount: process?.length ?? 0,
    finishedCount: finished?.length ?? 0,
  }),
);

export default function OrdersPage() {
  const { setPauseOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { pausedCount, processCount, finishedCount } =
    useSelector(countsRetriever);
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 20,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPauseOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** Handlers */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="orders by status"
                  className={"table_list"}
                  variant="scrollable"
                  scrollButtons={false}
                >
                  <Tab label={`Paused Orders (${pausedCount})`} value={"1"} />
                  <Tab
                    label={`Processing Orders (${processCount})`}
                    value={"2"}
                  />
                  <Tab
                    label={`Finished Orders (${finishedCount})`}
                    value={"3"}
                  />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
