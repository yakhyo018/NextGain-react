/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 * Added sweetLoginRequired(): the prompt a guest sees when an action needs an
 * account. Nothing else in the file was touched.
 * ========================================================================== */

/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  await Swal.fire({
    icon: "error",
    text: message,
    showConfirmButton: false,
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

/**
 * Shown when a guest tries to do something that needs an account.
 * Resolves to true when the visitor chose to go to the login page.
 */
export const sweetLoginRequired = async (): Promise<boolean> => {
  const result = await Swal.fire({
    icon: "info",
    title: "Login required",
    text: Messages.error2,
    showCancelButton: true,
    confirmButtonText: "Login",
    cancelButtonText: "Not now",
    confirmButtonColor: "#3b6e4f",
    cancelButtonColor: "#9b9b95",
    reverseButtons: true,
  });
  return result.isConfirmed;
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};
