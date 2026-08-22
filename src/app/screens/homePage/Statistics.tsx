/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Icon + number + label band. The numbers were hardcoded before too.
 * ========================================================================== */

import { Box, Container, Stack } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const STATS = [
  { icon: <Inventory2OutlinedIcon fontSize="small" />, num: "1,250+", text: "Products" },
  { icon: <SentimentSatisfiedAltIcon fontSize="small" />, num: "98K+", text: "Happy Customers" },
  { icon: <WorkspacePremiumOutlinedIcon fontSize="small" />, num: "45+", text: "Top Brands" },
  { icon: <LocalShippingOutlinedIcon fontSize="small" />, num: "250K+", text: "Orders Delivered" },
];

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          {STATS.map((stat) => (
            <Stack className="static-box" key={stat.text}>
              <Box className="static-icon">{stat.icon}</Box>
              <Box>
                <Box className="static-num">{stat.num}</Box>
                <Box className="static-text">{stat.text}</Box>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Container>
    </div>
  );
}
