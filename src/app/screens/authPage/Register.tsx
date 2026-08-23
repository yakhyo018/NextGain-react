/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Full-bleed photo background, its own AuthNavbar, white form panel on the
 * right, no footer. The MemberService.signup call is unchanged.
 *
 * The three fields map onto what the backend actually stores:
 *   Full Name      -> memberNick
 *   Phone          -> memberPhone
 *   Password       -> memberPassword
 * ========================================================================== */

import { useState } from "react";
import { Box, Button, Container, IconButton, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link, useHistory } from "react-router-dom";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import AuthNavbar from "../../components/headers/AuthNavbar";
import "../../../css/auth.css";

export default function RegisterPage() {
  const history = useHistory();
  const { setAuthMember } = useGlobals();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
    <div
      className={"auth-page"}
      style={{ backgroundImage: "url(/img/signup.png)" }}
    >
      <AuthNavbar title="Register" />

      <Box className={"auth-body"}>
        <Container className={"auth-inner"}>
          {/* motivational line, sitting low over the photo */}
          <Box className={"auth-quote"}>
            <span className={"quote-kicker"}>NextGain</span>
            <h3>
              Start where
              <br />
              <em>you are</em>
            </h3>
            <p>
              The best day to begin was yesterday. The second best is the one
              you are standing in.
            </p>
          </Box>

          <Box className={"auth-card"}>
            <h2>Create your account</h2>
            <p className={"auth-lead"}>Join NextGain Store today.</p>

            <Stack className={"auth-fields"}>
              <div className={"ng-field"}>
                <label htmlFor="reg-nick">Full Name</label>
                <input
                  id="reg-nick"
                  className={"ng-input"}
                  type="text"
                  placeholder="Enter your full name"
                  value={memberNick}
                  onChange={(e) => setMemberNick(e.target.value)}
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className={"ng-field"}>
                <label htmlFor="reg-pass">Password</label>
                <div className={"pass-wrap"}>
                  <input
                    id="reg-pass"
                    className={"ng-input"}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={memberPassword}
                    onChange={(e) => setMemberPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <IconButton
                    className={"pass-toggle"}
                    aria-label={showPassword ? "hide password" : "show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                </div>
              </div>
            </Stack>

            <Button
              className={"auth-submit"}
              variant="contained"
              onClick={handleSignupRequest}
            >
              Register
            </Button>

            <Box className={"auth-foot"}>
              Already have an account? <Link to="/login">Login</Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
