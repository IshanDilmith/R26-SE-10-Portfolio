import { useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Domain from "./components/Domain.jsx";
import ResearchComponents from "./components/ResearchComponents.jsx";
import Milestones from "./components/Milestones.jsx";
import Documents from "./components/Documents.jsx";
import Presentations from "./components/Presentations.jsx";
import Team from "./components/Team.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "./lib/gsap.js";

export default function App() {
  const root = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const mm = gsap.matchMedia();

      // Generic entrance for blocks marked `.reveal`, batched so neighbours stagger together.
      mm.add(MOTION_OK, () => {
        const blocks = root.current.querySelectorAll(".reveal");
        gsap.set(blocks, { autoAlpha: 0, y: 48 });
        ScrollTrigger.batch(blocks, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09, overwrite: "auto" }),
        });
      });

      // Smooth in-page navigation that lands below the floating navbar.
      const onClick = contextSafe((e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const smooth = window.matchMedia(MOTION_OK).matches;
        gsap.to(window, {
          duration: smooth ? 1.2 : 0,
          ease: "power3.inOut",
          scrollTo: { y: target, offsetY: link.getAttribute("href") === "#home" ? 0 : 72, autoKill: true },
        });
        history.replaceState(null, "", link.getAttribute("href"));
      });
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <Navbar />
      <main>
        <Hero />
        <Domain />
        <ResearchComponents />
        <Milestones />
        <Documents />
        <Presentations />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
