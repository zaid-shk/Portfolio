import React, { createContext, useState } from "react";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // --- Projects Data (no localStorage) ---
  const [projects] = useState([
    {
      id: 1,
      title: "Neon Portfolio",
      desc: "A futuristic portfolio design with interactive cursors and smooth scrolling.",
      tags: ["React", "GSAP", "Lenis", "Tailwind"],
      color: "#00f2ea",
      link: "https://portfolio-new-amber-ten.vercel.app/",
      gitHubLink: "https://github.com/zaid-shk/Portfolio.git",
      image: "",
    },
  ]);

  return (
    <PortfolioContext.Provider value={{ projects }}>
      {children}
    </PortfolioContext.Provider>
  );
};
