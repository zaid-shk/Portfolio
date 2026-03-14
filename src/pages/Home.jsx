import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-dark text-white min-h-screen">
      <AnimatePresence mode="wait">
        {loading && <Loader setLoading={setLoading} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Contact />
        </>
      )}
    </div>
  );
};

export default Home;
