/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * @claude-change  2026-11-10  |  Soft Pastel redesign
 * REWRITTEN
 *
 * Only the shared top bar now. The hero (lilac welcome card + category
 * tiles) moved into the home page itself as HomeHero.
 * ========================================================================== */

import SiteNav, { SiteNavProps } from "./SiteNav";

export default function HomeNavbar(props: SiteNavProps) {
  return (
    <div className="home-navbar">
      <SiteNav {...props} />
    </div>
  );
}
