import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      // Simple hardcoded password for demo
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Admin Access</h2>
          <p className="text-gray-400">Please verify your identity</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                placeholder="Enter access code"
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              Access Denied: Invalid credentials
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition-colors"
          >
            Enter Dashboard
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
