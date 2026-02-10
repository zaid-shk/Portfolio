import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "About", to: "about" },
    { name: "Work", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <a
        href="#"
        className="font-heading font-black text-2xl tracking-tighter hover:text-primary transition-colors cursor-pointer"
        onClick={() => window.scrollTo(0, 0)}
      >
        Mohammad zaid <span className="text-primary">.</span>
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.to}
              smooth={true}
              duration={500}
              offset={-70}
              className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 backdrop-blur-xl p-6 flex flex-col gap-6 items-center shadow-2xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-medium hover:text-primary transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
