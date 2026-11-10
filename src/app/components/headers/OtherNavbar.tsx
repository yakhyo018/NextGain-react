/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * @claude-change  2026-11-10  |  Soft Pastel redesign
 * REWRITTEN
 *
 * Shared top bar (SiteNav) plus a rounded pastel banner with the page title,
 * a one-line intro and the breadcrumb. Each route has its own pastel.
 * ========================================================================== */

import { Box, Container } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import SiteNav, { SiteNavProps } from "./SiteNav";

/** pathname -> banner title, intro line and pastel */
const PAGE_TITLES: {
  path: string;
  title: string;
  intro: string;
  tone: string;
}[] = [
  {
    path: "/products",
    title: "Products",
    intro: "Protein, creatine, pre-workout and more — all original.",
    tone: "mint",
  },
  {
    path: "/orders",
    title: "Orders",
    intro: "Pay, track and look back at everything you ordered.",
    tone: "peach",
  },
  {
    path: "/member-page",
    title: "My Page",
    intro: "Your profile, details and settings in one place.",
    tone: "lilac",
  },
  {
    path: "/help",
    title: "Help Center",
    intro: "Answers, rules and a friendly team ready to help.",
    tone: "sky",
  },
];

export default function OtherNavbar(props: SiteNavProps) {
  const location = useLocation();

  /** a single product sits one level below the products list */
  const isProductDetail = /^\/products\/[^/]+/.test(location.pathname);
  const matched = PAGE_TITLES.find((page) =>
    location.pathname.startsWith(page.path),
  );
  const title = isProductDetail
    ? "Product Detail"
    : matched
      ? matched.title
      : "NextGain";
  const tone = isProductDetail ? "lemon" : (matched?.tone ?? "lilac");

  return (
    <div className="other-navbar">
      <SiteNav {...props} />

      <div className="page-hero">
        <Container>
          <Box className={`page-banner page-banner--${tone}`}>
            <Box className="crumbs">
              <NavLink to="/">Home</NavLink>
              <span className="sep">/</span>
              {isProductDetail ? (
                <>
                  <NavLink to="/products">Products</NavLink>
                  <span className="sep">/</span>
                </>
              ) : null}
              <span>{title}</span>
            </Box>
            <h1>{title}</h1>
            {!isProductDetail && matched ? (
              <p className="page-intro">{matched.intro}</p>
            ) : null}
          </Box>
        </Container>
      </div>
    </div>
  );
}
