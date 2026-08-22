/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * NEW FILE
 *
 * Promo panel with a live countdown to the end of the current month.
 * ========================================================================== */

import { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";

/** Midnight on the first day of next month — the promo window. */
const endOfMonth = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
};

const split = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
  };
};

export default function SpecialOffer() {
  const history = useHistory();
  const [left, setLeft] = useState(() => endOfMonth().getTime() - Date.now());

  useEffect(() => {
    const target = endOfMonth().getTime();
    const timer = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { days, hours, mins, secs } = split(left);

  return (
    <div className={"offer-frame"}>
      <Box className={"panel"}>
        <Box>
          <span className="ng-section-title">Special Offer</span>
          <Box className={"offer-head"} sx={{ mt: "10px" }}>
            Up to 30% off
          </Box>
          <Box className={"offer-sub"}>
            On selected protein, creatine and pre-workout — this month only.
          </Box>
        </Box>

        <Stack className={"countdown"}>
          <Box className={"unit"}>
            <b>{String(days).padStart(2, "0")}</b>
            <span>Days</span>
          </Box>
          <Box className={"unit"}>
            <b>{String(hours).padStart(2, "0")}</b>
            <span>Hours</span>
          </Box>
          <Box className={"unit"}>
            <b>{String(mins).padStart(2, "0")}</b>
            <span>Mins</span>
          </Box>
          <Box className={"unit"}>
            <b>{String(secs).padStart(2, "0")}</b>
            <span>Secs</span>
          </Box>
        </Stack>

        <Box sx={{ mt: "18px" }}>
          <Button
            className="ng-btn ng-btn--primary"
            variant="contained"
            onClick={() => history.push("/products")}
          >
            Shop Now
          </Button>
        </Box>
      </Box>
    </div>
  );
}
