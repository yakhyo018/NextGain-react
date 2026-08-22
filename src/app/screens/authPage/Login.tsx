/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * NEW FILE
 *
 * Standalone login page replacing the modal. The MemberService.login call is
 * the same one the modal used.
 * ========================================================================== */

import { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/auth.css";

export default function LoginPage() {
  const history = useHistory();
  const { setAuthMember } = useGlobals();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");

  /** HANDLERS **/

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      // Saving Authenticated user
      setAuthMember(result);
      history.push("/");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleKeyDown = (e: T) => {
    if (e.key === "Enter") handleLoginRequest().then();
  };

  return (
    <div className={"auth-page"}>
      <Container>
        <Box className={"auth-card"}>
          <Box
            className={"auth-visual"}
            sx={{ backgroundImage: "url(/img/sportPitBanner.png)" }}
          >
            <Box className={"visual-title"}>
              Welcome
              <br />
              back
            </Box>
            <Box className={"visual-sub"}>
              Pick up where you left off — your cart, your orders and your saved
              details are waiting.
            </Box>
          </Box>

          <Box className={"auth-form"}>
            <h2>Welcome back!</h2>
            <p className={"auth-lead"}>Please sign in to your account.</p>

            <Stack className={"auth-fields"}>
              <div className={"ng-field"}>
                <label htmlFor="login-nick">Username</label>
                <input
                  id="login-nick"
                  className={"ng-input"}
                  type="text"
                  placeholder="Enter your username"
                  value={memberNick}
                  onChange={(e) => setMemberNick(e.target.value)}
                />
              </div>

              <div className={"ng-field"}>
                <label htmlFor="login-pass">Password</label>
                <input
                  id="login-pass"
                  className={"ng-input"}
                  type="password"
                  placeholder="Enter your password"
                  value={memberPassword}
                  onChange={(e) => setMemberPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </Stack>

            <Button
              className={"ng-btn ng-btn--primary auth-submit"}
              variant="contained"
              onClick={handleLoginRequest}
            >
              Login
            </Button>

            <Box className={"auth-foot"}>
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
