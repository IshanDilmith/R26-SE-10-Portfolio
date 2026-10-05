// Single place where GSAP and its plugins are registered.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText, ScrambleTextPlugin, DrawSVGPlugin, Flip);
gsap.defaults({ ease: "expo.out", duration: 1 });

// Self-hosted fonts change line breaks and section heights once loaded.
if (typeof document !== "undefined" && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

// Every animation is registered under this query, so reduced-motion users get static content.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const motionAllowed = () =>
  typeof window !== "undefined" && window.matchMedia(MOTION_OK).matches;

// Shared SplitText class names; masks become `split-line-mask` etc. (styled in global.css).
export const SPLIT_CLASSES = { linesClass: "split-line", wordsClass: "split-word", charsClass: "split-char" };

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
