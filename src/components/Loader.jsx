import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ setLoading }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = "hidden";

    // Simulate loading for about 3-4 seconds
    const duration = 3500;
    const steps = 100;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (count === 100) {
      // Wait a moment at 100% before transitioning
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [count, setLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 242, 234, 0.3) 0%, rgba(0,0,0,0) 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Counter */}
      <div className="z-10 relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-8xl md:text-9xl font-bold font-heading tracking-tighter"
        >
          {count}%
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-zinc-800 mt-8 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
          {/* Shimmer Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
          />
        </div>

        {/* Status Text - Changes based on percentage */}
        <div className="mt-4 h-6 overflow-hidden relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={count < 30 ? "init" : count < 70 ? "assets" : "ready"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 text-sm uppercase tracking-widest font-medium flex items-center gap-2"
            >
              {count < 30
                ? "Initializing"
                : count < 70
                  ? "Loading Assets"
                  : "Almost Ready"}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full inline-block"
              />
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
