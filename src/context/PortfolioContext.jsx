import React, { createContext, useState, useEffect } from "react";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // --- Projects Data ---
  const defaultProjects = [
    {
      id: 1,
      title: "Neon Portfolio",
      desc: "A futuristic portfolio design with interactive cursors and smooth scrolling.",
      tags: ["React", "GSAP", "Lenis", "Tailwind"],
      color: "#00f2ea",
      link: "#",
      gitHubLink: "#",
      image: "",
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      desc: "Interactive dashboard with data visualization and real-time updates.",
      tags: ["React", "Chart.js", "Motion", "Express"],
      color: "#ff0055",
      link: "#",
      gitHubLink: "#",
      image: "",
    },
    {
      id: 3,
      title: "SaaS Landing Page",
      desc: "High-converting landing page with subtle animations and sticky navigation.",
      tags: ["React", "Tailwind", "Vite", "Framer"],
      color: "#bc13fe",
      link: "#",
      gitHubLink: "#",
      image: "",
    },
  ];

  // Initialize from LocalStorage or use defaults
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("portfolio_messages");
    return saved ? JSON.parse(saved) : [];
  });

  // --- Effects to sync with LocalStorage ---
  useEffect(() => {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolio_messages", JSON.stringify(messages));
  }, [messages]);

  // --- Actions ---
  const addProject = (newProject) => {
    setProjects((prev) => [
      ...prev,
      { ...newProject, id: Date.now() }, // Simple ID generation
    ]);
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addMessage = (msg) => {
    setMessages((prev) => [
      { ...msg, id: Date.now(), date: new Date().toISOString() },
      ...prev,
    ]);
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        setProjects,
        addProject,
        deleteProject,
        messages,
        addMessage,
        deleteMessage,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
