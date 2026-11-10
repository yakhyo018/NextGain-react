/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Full-bleed photo background, its own AuthNavbar, white form panel on the
 * right, no footer. The MemberService.login call is unchanged.
 *
 * Note on the first field: the backend matches a member by memberNick, so the
 * label says Username even though the mock reads "Email or Phone".
 *
 * @claude-change  2026-11-10  |  Soft Pastel redesign
 * The gym photo is gone: the quote sits on a pastel panel with a small
 * product shelf, next to the form card. Handlers are unchanged.
 * ========================================================================== */

import { useState } from "react";
import { Box, Button, Container, IconButton, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link, useHistory } from "react-router-dom";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import AuthNavbar from "../../components/headers/AuthNavbar";
import "../../../css/auth.css";

export default function LoginPage() {
  const history = useHistory();
  const { setAuthMember } = useGlobals();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
    <div className={"auth-page auth-page--login"}>
      <AuthNavbar title="Login" />

      <Box className={"auth-body"}>
        <Container className={"auth-inner"}>
          {/* motivational line on a pastel panel, with a little product shelf */}
          <Box className={"auth-quote"}>
            <span className={"quote-kicker"}>NextGain</span>
            <h3>
              Stronger than
              <br />
              <em>yesterday</em>
            </h3>
            <p>
              Nobody gets there in one session. Show up, refuel, repeat — the
              results follow the routine.
            </p>
            <Box className={"auth-shelf"}>
              <span className={"auth-shelf-item auth-shelf-item--mint"}>
                <img src="/img/categories/protein.webp" alt="" />
              </span>
              <span className={"auth-shelf-item auth-shelf-item--peach"}>
                <img src="/img/categories/pre-workout.png" alt="" />
              </span>
              <span className={"auth-shelf-item auth-shelf-item--sky"}>
                <img src="/img/categories/creatine.webp" alt="" />
              </span>
            </Box>
          </Box>

          <Box className={"auth-card"}>
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
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className={"ng-field"}>
                <label htmlFor="login-pass">Password</label>
                <div className={"pass-wrap"}>
                  <input
                    id="login-pass"
                    className={"ng-input"}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

            <Box className={"forgot-row"}>
              <Link to="/help">Forgot password?</Link>
            </Box>

            <Button
              className={"auth-submit"}
              variant="contained"
              onClick={handleLoginRequest}
            >
              Login
            </Button>

            <Box className={"auth-foot"}>
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
