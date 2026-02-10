import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Palette,
  Terminal,
  Globe,
  Cpu,
  Database,
  Zap,
  Server,
  Github,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        x: -100,
        opacity: 0,
        duration: 1,
      });

      // Animate Text
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stagger Skills
      gsap.from(".skill-tag", {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
      id="about"
    >
      <div className="mb-16">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-4">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Me
          </span>
        </h2>
        <div className="h-1 w-20 bg-secondary rounded-full opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div
          ref={textRef}
          className="text-lg md:text-xl text-gray-400 leading-relaxed space-y-6"
        >
          <p>
            I am a passionate Frontend Developer who bridges the gap between
            design and technology. With a keen eye for detail and a love for
            smooth interactions, I build websites that feel alive.
          </p>
          <p>
            I specialize in creating performance-optimized, accessible, and
            visually stunning web applications using modern technologies and
            creative coding practices.
          </p>
        </div>

        <div ref={skillsRef} className="mt-12 md:mt-0">
          <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
            <Cpu className="text-primary" />
            Tech Stack
          </h3>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 gap-8">
            {/* Frontend */}
            <div>
              <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Code2 size={16} /> Frontend Development
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  // "Next.js",
                  "JavaScript (ES6+)",
                  // "TypeScript",
                  "HTML5",
                  "CSS3",
                  "Tailwind CSS",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-primary/50 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Creative & Animation */}
            <div>
              <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Palette size={16} /> Creative & Animation
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "GSAP",
                  "Framer Motion",
                  // "Three.js",
                  "Lenis Scroll",
                  "Canvas API",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-secondary/50 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Backend & Tools */}
            <div>
              <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Terminal size={16} /> Backend & Tools
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  // "Node.js",
                  // "Express",
                  "MongoDB",
                  "Git & GitHub",
                  "Vite",
                  "Figma",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-green-500/50 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
