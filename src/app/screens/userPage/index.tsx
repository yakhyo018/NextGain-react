/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Profile card on the left, settings on the right.
 * MemberType.RESTAURANT replaced with MemberType.STORE (the old value no
 * longer exists in member.enum.ts).
 * ========================================================================== */

import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import { Settings } from "./Settings";
import "../../../css/userPage.css";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) history.push("/");

  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          {/* ---------- profile ---------- */}
          <Stack className={"my-page-left"}>
            <Box className={"order-info-box"}>
              <div className={"order-user-img"}>
                <img
                  alt={authMember?.memberNick}
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/img/myPhoto.jpg"
                  }
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  {authMember?.memberType === MemberType.STORE ? (
                    <StorefrontIcon />
                  ) : (
                    <PersonIcon />
                  )}
                </div>
              </div>

              <span className={"order-user-name"}>
                {authMember?.memberNick}
              </span>
              <span className={"order-user-prof"}>
                {authMember?.memberType}
              </span>
              <span className={"order-user-address"}>
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "No address added yet"}
              </span>

              <Box className={"user-media-box"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>

              <p className={"user-desc"}>
                {authMember?.memberDesc
                  ? authMember.memberDesc
                  : "No description yet — tell other members what you train for."}
              </p>
            </Box>
          </Stack>

          {/* ---------- settings ---------- */}
          <Stack className={"my-page-right"}>
            <Box className={"menu-name"}>Modify Member Details</Box>
            <Box className={"menu-content"}>
              <Settings />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
