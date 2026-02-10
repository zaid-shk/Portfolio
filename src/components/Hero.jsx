import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TypewriterText = ({ text, delay = 0, className = "" }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (startDelay) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: startDelay,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      custom={delay}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 2.5, // Delayed to wait for typing to finish
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section ref={heroRef} className="hero-section">
      <motion.div style={{ y }} className="hero-content">
        <h1 className="hero-title flex flex-col md:block">
          <TypewriterText text="Creative" delay={0.5} />{" "}
          <span className="gradient-text inline-block">
            <TypewriterText text="Developer" delay={1.5} />
          </span>
        </h1>
        <div ref={textRef} className="hero-subtitle">
          Crafting digital experiences with code and passion.
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="scroll-indicator"
      >
        <ArrowDown size={32} />
      </motion.div>

      <div className="hero-background"></div>
    </section>
  );
};

export default Hero;
