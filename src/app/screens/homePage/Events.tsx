/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Tinted offer cards instead of photo cards -- the old images were food
 * photos left over from the restaurant template.
 * ========================================================================== */

import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { plans, Plan } from "../../../lib/data/plans";

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className="ng-section-head">
          <span className="ng-section-title">Top Events &amp; Offers</span>
          <Link to="/products" className="ng-link-all">
            View All
          </Link>
        </Box>

        <Swiper
          className={"events-info swiper-wrapper"}
          slidesPerView={"auto"}
          spaceBetween={20}
          modules={[Autoplay, Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
        >
          {plans.map((value: Plan, number: number) => (
            <SwiperSlide key={number} className={"events-info-frame"}>
              <Box
                className={"event-card"}
                sx={{ background: value.tint, borderColor: value.border }}
              >
                <Box>
                  <span className={"event-tag"}>{value.tag}</span>
                  <Box className={"event-title"}>{value.title}</Box>
                  <p className={"event-desc"}>{value.desc}</p>
                </Box>
                <Link to="/products" className={"event-cta"}>
                  {value.cta}
                </Link>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box className={"prev-next-frame"}>
          <div className={"swiper-button-prev"}>
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          </div>
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <div className={"swiper-button-next"}>
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </div>
        </Box>
      </Stack>
    </div>
  );
}
