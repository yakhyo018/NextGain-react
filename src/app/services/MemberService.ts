/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 * BUG FIX -- updateMember returned 500. Two causes, both in this file:
 *   1. the manual 'Content-Type: multipart/form-data' header dropped the
 *      boundary, so the server could not parse the body
 *   2. memberImage was appended as a plain string when no new file was chosen,
 *      and multer rejects text on a file field
 * Everything else in this service is untouched.
 * ========================================================================== */

import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/top-users";
      const result = await axios.get(url);
      console.log("getTopUsers:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }

  public async getRestaurant(): Promise<Member> {
    try {
      const url = this.path + "/member/restaurant";
      const result = await axios.get(url);
      console.log("getRestaurant:", result);

      const restaurant: Member = result.data;
      return restaurant;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + "/member/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup:", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("Error, signup:", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + "/member/login";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("login:", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("Error, Login:", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = this.path + "/member/logout";
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout:", result);

      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("Error, Logout:", err);
      throw err;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();

      // memberNick and memberPhone carry a unique index in the Member schema.
      // Sending "" would blank the field, and the second member whose phone is
      // "" collides with the first one -> E11000 duplicate key -> 500.
      // So identity fields are only sent when they actually hold a value.
      if (input.memberNick?.trim())
        formData.append("memberNick", input.memberNick.trim());
      if (input.memberPhone?.trim())
        formData.append("memberPhone", input.memberPhone.trim());

      // address and description are optional and not indexed, so an empty
      // value is legitimate here -- it lets the member clear the field
      formData.append("memberAddress", input.memberAddress ?? "");
      formData.append("memberDesc", input.memberDesc ?? "");

      // Only send memberImage when the user actually picked a new file.
      // When nothing was chosen it is still the old path string, and multer
      // rejects a text value on a file field.
      if (input.memberImage instanceof File) {
        formData.append("memberImage", input.memberImage);
      }

      const result = await axios(`${serverApi}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        // No manual Content-Type here: the browser has to add the multipart
        // boundary itself, otherwise the server cannot parse the body.
      });
      console.log("updateMember:", result);

      const member: Member = result.data;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, updateMember:", err);
      throw err;
    }
  }
}

export default MemberService;
