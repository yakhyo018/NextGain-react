/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Markup only -- the handlers, validation and MemberService call are unchanged.
 * ========================================================================== */

import { Box } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg",
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberPassword: authMember?.memberPassword,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    },
  );

  // HANDLERS

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescriptionandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    const fileType = file.type,
      validateImageType = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageType.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({ ...memberUpdateInput });
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={memberImage} alt="profile" className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG or PNG only.</p>
          <Button
            component="label"
            className="ng-btn ng-btn--ghost"
            variant="outlined"
            startIcon={<CloudUploadOutlinedIcon />}
            onChange={handleImageViewer}
          >
            Choose file
            <input type="file" hidden />
          </Button>
        </div>
      </Box>

      <Box className={"input-frame"}>
        <div className={"ng-field"}>
          <label>Username</label>
          <input
            className={"ng-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
        <div className={"ng-field"}>
          <label>Phone</label>
          <input
            className={"ng-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "No phone"}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
      </Box>

      <Box className={"input-frame single"}>
        <div className={"ng-field"}>
          <label>Address</label>
          <input
            className={"ng-input mb-address"}
            type="text"
            placeholder={
              authMember?.memberAddress ? authMember.memberAddress : "No address"
            }
            value={memberUpdateInput.memberAddress}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>

      <Box className={"input-frame single"}>
        <div className={"ng-field"}>
          <label>Description</label>
          <textarea
            className={"ng-textarea mb-description"}
            placeholder={
              authMember?.memberDesc ? authMember.memberDesc : "No description"
            }
            value={memberUpdateInput.memberDesc}
            name="memberDesc"
            onChange={memberDescriptionandler}
          />
        </div>
      </Box>

      <Box className={"save-box"}>
        <Button
          className="ng-btn ng-btn--primary"
          variant={"contained"}
          onClick={handleSubmitButton}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
