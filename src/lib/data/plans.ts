/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Restaurant events replaced with supplement offers; each entry now carries a
 * tint instead of a photo path.
 *
 * @claude-change  2026-11-10  |  Soft Pastel redesign
 * Tints are now flat pastels (peach, mint, lilac, lemon), read from the
 * CSS tokens so they follow the palette.
 * ========================================================================== */

export interface Plan {
  tag: string;
  title: string;
  desc: string;
  cta: string;
  /** soft tint used as the card background */
  tint: string;
  border: string;
}

export const plans: Plan[] = [
  {
    tag: "Summer Sale",
    title: "Up to 30% off",
    desc: "Selected whey protein and isolate blends.",
    cta: "Shop now",
    tint: "var(--ng-peach)",
    border: "var(--ng-peach)",
  },
  {
    tag: "Creatine Sale",
    title: "Buy 1 get 1 free",
    desc: "Micronized creatine monohydrate, 300g tubs.",
    cta: "Shop now",
    tint: "var(--ng-mint)",
    border: "var(--ng-mint)",
  },
  {
    tag: "New Brand",
    title: "Dynamize arrived",
    desc: "Full pre-workout and amino line now in stock.",
    cta: "Explore",
    tint: "var(--ng-lilac)",
    border: "var(--ng-lilac)",
  },
  {
    tag: "Free Shipping",
    title: "On orders over $100",
    desc: "Delivered anywhere in Uzbekistan within 48 hours.",
    cta: "See details",
    tint: "var(--ng-lemon)",
    border: "var(--ng-lemon)",
  },
];
