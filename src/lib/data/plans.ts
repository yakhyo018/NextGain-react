/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Restaurant events replaced with supplement offers; each entry now carries a
 * tint instead of a photo path.
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
    tint: "linear-gradient(120deg, #fbeeea 0%, #fdf8f6 100%)",
    border: "#f0ddd6",
  },
  {
    tag: "Creatine Sale",
    title: "Buy 1 get 1 free",
    desc: "Micronized creatine monohydrate, 300g tubs.",
    cta: "Shop now",
    tint: "linear-gradient(120deg, #eaf1ec 0%, #f7fbf8 100%)",
    border: "#d8e6dc",
  },
  {
    tag: "New Brand",
    title: "Dynamize arrived",
    desc: "Full pre-workout and amino line now in stock.",
    cta: "Explore",
    tint: "linear-gradient(120deg, #e9eef5 0%, #f7fafd 100%)",
    border: "#d6e0ec",
  },
  {
    tag: "Free Shipping",
    title: "On orders over $100",
    desc: "Delivered anywhere in Uzbekistan within 48 hours.",
    cta: "See details",
    tint: "linear-gradient(120deg, #f4f1e7 0%, #fbfaf5 100%)",
    border: "#e6e1d1",
  },
];
