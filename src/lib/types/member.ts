/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 * MemberUpdateInput.memberImage is now string | File -- Settings.tsx assigns a
 * File to it once the user picks an image, which the old string type hid.
 * ========================================================================== */

import type { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  /** the stored path while nothing is chosen, a File once the user picks one */
  memberImage?: string | File;
}
