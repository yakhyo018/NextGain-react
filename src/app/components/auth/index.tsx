/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REPLACED
 *
 * The signup/login modal was replaced by the standalone pages in
 * src/app/screens/authPage. This file only re-exports them; the whole
 * components/auth folder can be deleted.
 * ========================================================================== */

export { default as LoginPage } from "../../screens/authPage/Login";
export { default as RegisterPage } from "../../screens/authPage/Register";
