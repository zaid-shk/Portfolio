import React, { useEffect, useState, useContext } from "react";
import {
  User,
  LogOut,
  Settings,
  Layout,
  Code2,
  Folder,
  Mail,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";

const Admin = () => {
  const { projects, addProject, deleteProject, messages, addMessage } =
    useContext(PortfolioContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddMessage, setShowAddMessage] = useState(false);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: "",
    desc: "",
    tags: "",
    color: "#00f2ea",
    link: "",
    gitHubLink: "",
    image: "",
  });

  // Manual Message Form State
  const [manualMessage, setManualMessage] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    addProject({
      ...newProject,
      tags: newProject.tags.split(",").map((t) => t.trim()), // Convert comma-separated string to array
    });
    setNewProject({
      title: "",
      desc: "",
      tags: "",
      color: "#00f2ea",
      link: "",
      gitHubLink: "",
      image: "",
    });
    setShowAddProject(false);
  };

  const handleManualAddMessage = (e) => {
    e.preventDefault();
    addMessage(manualMessage);
    setManualMessage({ name: "", email: "", subject: "", message: "" });
    setShowAddMessage(false);
  };

  const navItems = [
    { id: "overview", icon: <Layout />, label: "Overview" },
    { id: "projects", icon: <Folder />, label: "Projects" },
    { id: "messages", icon: <Mail />, label: "Messages" },
    // { id: "tech-stack", icon: <Code2 />, label: "Tech Stack" },
    // { id: "settings", icon: <Settings />, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-white/10 flex-col justify-between p-6 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg">
              A
            </div>
            <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-white text-black shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className={
                    activeTab === item.id
                      ? "text-primary-dark"
                      : "text-gray-400"
                  }
                >
                  {React.cloneElement(item.icon, { size: 18 })}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors w-full"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-black p-4 md:p-8 overflow-y-auto relative">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
            <p className="text-gray-400 text-sm">
              Manage your portfolio content
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-gray-300">
                System Online
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-gray-400">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 min-h-[500px]">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 p-6 rounded-xl border border-white/5 transition-hover hover:border-primary/30">
                <h3 className="text-gray-400 text-sm font-medium mb-2">
                  Total Projects
                </h3>
                <p className="text-3xl font-bold text-white">
                  {projects.length}
                </p>
                <div className="mt-4 text-xs text-green-400 flex items-center gap-1">
                  {projects.length > 0 ? "Active & Live" : "No projects yet"}
                </div>
              </div>
              <div className="bg-black/40 p-6 rounded-xl border border-white/5 transition-hover hover:border-primary/30">
                <h3 className="text-gray-400 text-sm font-medium mb-2">
                  New Messages
                </h3>
                <p className="text-3xl font-bold text-white">
                  {messages.length}
                </p>
                <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
                  Check inbox for details
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Your Projects</h3>
                <button
                  onClick={() => setShowAddProject(true)}
                  className="bg-primary text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
                >
                  <Plus size={18} /> Add Project
                </button>
              </div>

              {/* Add Project Form (Collapsible) */}
              {showAddProject && (
                <div className="bg-black/60 border border-white/10 p-6 rounded-xl mb-8 animate-in fade-in slide-in-from-top-4">
                  <div className="flex justifying-between items-center mb-4">
                    <h4 className="text-lg font-bold">New Project Details</h4>
                    {/* Close button not strictly needed as submitting closes it, but good UX */}
                  </div>
                  <form onSubmit={handleAddProject} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Theme Color
                        </label>
                        <input
                          type="color"
                          className="w-full h-10 bg-zinc-900 border border-white/10 rounded cursor-pointer"
                          value={newProject.color}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              color: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Project Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                        value={newProject.image}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            image: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/yourusername/project"
                        className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                        value={newProject.gitHubLink}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            gitHubLink: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Project URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/yourusername/project"
                        className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                        value={newProject.link || ""}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            link: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Description
                      </label>
                      <textarea
                        required
                        className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                        rows="3"
                        value={newProject.desc}
                        onChange={(e) =>
                          setNewProject({ ...newProject, desc: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="React, Tailwind, GSAP..."
                        className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                        value={newProject.tags}
                        onChange={(e) =>
                          setNewProject({ ...newProject, tags: e.target.value })
                        }
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[
                          "React",
                          "Tailwind",
                          "GSAP",
                          "Next.js",
                          "Framer Motion",
                          "Three.js",
                          "Node.js",
                          "MongoDB",
                          "Express",
                          "TypeScript",
                        ].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              const currentTags = newProject.tags
                                .split(",")
                                .map((t) => t.trim())
                                .filter((t) => t.length > 0);
                              if (!currentTags.includes(tag)) {
                                const newTags =
                                  currentTags.length > 0
                                    ? [...currentTags, tag].join(", ")
                                    : tag;
                                setNewProject({ ...newProject, tags: newTags });
                              }
                            }}
                            className="text-xs bg-zinc-800 border border-white/10 px-2 py-1 rounded text-gray-400 hover:bg-zinc-700 hover:text-white transition-colors"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowAddProject(false)}
                        className="px-4 py-2 rounded text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-primary text-black px-6 py-2 rounded font-bold hover:bg-white transition-colors"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Project List */}
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-black/40 border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-xl font-bold"
                        style={{ color: project.color }}
                      >
                        {project.title.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">
                          {project.title}
                        </h4>
                        <p className="text-sm text-gray-400 truncate max-w-xs">
                          {project.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-zinc-800 px-2 py-1 rounded text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-gray-400">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No projects found. Add one to get started!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === "messages" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  Inbox ({messages.length})
                </h3>
                <button
                  onClick={() => setShowAddMessage(!showAddMessage)}
                  className="bg-primary text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
                >
                  {showAddMessage ? <X size={18} /> : <Plus size={18} />}
                  {showAddMessage ? "Cancel" : "Log Message"}
                </button>
              </div>

              {/* Add Message Form (Collapsible) */}
              {showAddMessage && (
                <div className="bg-black/60 border border-white/10 p-6 rounded-xl mb-8 animate-in fade-in slide-in-from-top-4">
                  <div className="flex justifying-between items-center mb-4">
                    <h4 className="text-lg font-bold">Log New Message</h4>
                  </div>
                  <form onSubmit={handleManualAddMessage} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                          value={manualMessage.name}
                          onChange={(e) =>
                            setManualMessage({
                              ...manualMessage,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                          value={manualMessage.email}
                          onChange={(e) =>
                            setManualMessage({
                              ...manualMessage,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                        value={manualMessage.subject}
                        onChange={(e) =>
                          setManualMessage({
                            ...manualMessage,
                            subject: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Message
                      </label>
                      <textarea
                        required
                        className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none"
                        rows="3"
                        value={manualMessage.message}
                        onChange={(e) =>
                          setManualMessage({
                            ...manualMessage,
                            message: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowAddMessage(false)}
                        className="px-4 py-2 rounded text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-primary text-black px-6 py-2 rounded font-bold hover:bg-white transition-colors"
                      >
                        Save Message
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    <Mail size={48} className="mx-auto mb-4 opacity-50" />
                    <p>
                      No messages yet. They will appear here when someone
                      contacts you.
                    </p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className="bg-black/40 border border-white/5 p-6 rounded-xl"
                    >
                      <div className="flex justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-white">{msg.name}</h4>
                          <p className="text-sm text-primary">{msg.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500">
                            {new Date(msg.date).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() =>
                              window.open(
                                `mailto:${msg.email}?subject=Re: ${msg.subject}`,
                              )
                            }
                            className="text-xs bg-primary text-black px-3 py-1 rounded-md font-bold hover:bg-white transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                      <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5">
                        <h5 className="text-sm font-bold text-gray-300 mb-2">
                          {msg.subject}
                        </h5>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
