/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Panel with overlapping avatars instead of the old card grid.
 * ========================================================================== */

import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR */
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className={"active-users-frame"}>
      <Box className={"panel"}>
        <span className="ng-section-title">Active Users</span>

        {topUsers.length !== 0 ? (
          <>
            <Stack className={"avatars"}>
              {topUsers.slice(0, 6).map((member: Member) => (
                <Box className={"member-card"} key={member._id}>
                  <img
                    src={
                      member.memberImage
                        ? `${serverApi}/${member.memberImage}`
                        : "/img/default-user.png"
                    }
                    alt={member.memberNick}
                  />
                  <span className={"member-nickname"}>{member.memberNick}</span>
                </Box>
              ))}
            </Stack>
            <Box className={"count-line"}>
              <strong>{topUsers.length}</strong> members are training with
              NextGain right now.
            </Box>
          </>
        ) : (
          <Box className="no-data">No active users yet.</Box>
        )}
      </Box>
    </div>
  );
}
