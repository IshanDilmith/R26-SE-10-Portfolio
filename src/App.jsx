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
import { useReveal } from "./hooks/useReveal.js";

export default function App() {
  useReveal();

  return (
    <>
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
    </>
  );
}
