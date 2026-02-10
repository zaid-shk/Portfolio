import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Code, ExternalLink } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-24 md:mb-32 relative"
    >
      <div
        className="relative overflow-hidden rounded-2xl aspect-video bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover:border-[--p-color]"
        style={{ "--p-color": project.color }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--p-color),_transparent_70%)] group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Code size={64} style={{ color: project.color, opacity: 0.8 }} />
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          <a
            href={project.gitHubLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
          >
            <Github size={20} />
          </a>
          <a
            href={project.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <motion.h3
          className="text-3xl md:text-5xl font-bold mb-4"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {project.title}
        </motion.h3>

        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs md:text-sm font-medium border border-zinc-800 bg-zinc-900/50 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-medium hover:text-[--p-color] transition-colors group/link"
          style={{ "--p-color": project.color }}
        >
          View Case Study{" "}
          <ArrowRight
            size={18}
            className="group-hover/link:translate-x-1 transition-transform"
          />
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { projects } = useContext(PortfolioContext);

  return (
    <section
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-dark"
      id="projects"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-4">
          Selected{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Works
          </span>
        </h2>
        <div className="h-1 w-20 bg-secondary rounded-full"></div>
      </motion.div>

      <div>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
