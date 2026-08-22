/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Same video, wrapped in a rounded banner with a headline overlay.
 * ========================================================================== */

import { Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Advertisement() {
  return (
    <div className="ads-restaurant-frame">
      <video
        className={"ads-video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source type="video/mp4" src="video/burak-ads.mp4" />
      </video>

      <Box className="ads-overlay">
        <Box className="ads-title">
          Built different
          <br />
          made stronger
        </Box>
        <Box className="ads-sub">
          <span className="play-dot">
            <PlayArrowIcon sx={{ fontSize: 18 }} />
          </span>
          Watch our story
        </Box>
      </Box>
    </div>
  );
}
