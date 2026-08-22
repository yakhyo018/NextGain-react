/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * NEW FILE
 *
 * Standalone register page replacing the modal. The MemberService.signup call
 * is the same one the modal used.
 * ========================================================================== */

import { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/auth.css";

export default function RegisterPage() {
  const history = useHistory();
  const { setAuthMember } = useGlobals();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");

  /** HANDLERS **/

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      // Saving Authenticated user
      setAuthMember(result);
      history.push("/");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleKeyDown = (e: T) => {
    if (e.key === "Enter") handleSignupRequest().then();
  };

  return (
    <div className={"auth-page"}>
      <Container>
        <Box className={"auth-card"}>
          <Box
            className={"auth-visual"}
            sx={{ backgroundImage: "url(/img/otherNavbarImg.jpg)" }}
          >
            <Box className={"visual-title"}>
              Join
              <br />
              NextGain
            </Box>
            <Box className={"visual-sub"}>
              Track your orders, save your favourites and get member-only prices
              on every restock.
            </Box>
          </Box>

          <Box className={"auth-form"}>
            <h2>Create your account</h2>
            <p className={"auth-lead"}>Join NextGain Store today.</p>

            <Stack className={"auth-fields"}>
              <div className={"ng-field"}>
                <label htmlFor="reg-nick">Username</label>
                <input
                  id="reg-nick"
                  className={"ng-input"}
                  type="text"
                  placeholder="Enter your username"
                  value={memberNick}
                  onChange={(e) => setMemberNick(e.target.value)}
                />
              </div>

              <div className={"ng-field"}>
                <label htmlFor="reg-phone">Phone</label>
                <input
                  id="reg-phone"
                  className={"ng-input"}
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                />
              </div>

              <div className={"ng-field"}>
                <label htmlFor="reg-pass">Password</label>
                <input
                  id="reg-pass"
                  className={"ng-input"}
                  type="password"
                  placeholder="Create a password"
                  value={memberPassword}
                  onChange={(e) => setMemberPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </Stack>

            <Button
              className={"ng-btn ng-btn--primary auth-submit"}
              variant="contained"
              onClick={handleSignupRequest}
            >
              Register
            </Button>

            <Box className={"auth-foot"}>
              Already have an account? <Link to="/login">Login</Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
