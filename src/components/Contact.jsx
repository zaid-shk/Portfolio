import React, { useRef, useState, useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Linkedin,
  Twitter,
  Github,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const { addMessage } = useContext(PortfolioContext);
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const Links = [
    { icon: Github, url: "https://github.com/zaid-shk" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/mohammadzaid04/" },
    { icon: Twitter, url: "https://x.com/zaidshk04" },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Capture form data for Admin Panel
    const formData = new FormData(formRef.current);
    const newMessage = {
      name: formData.get("user_name"),
      email: formData.get("user_email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS SERVICE ID, TEMPLATE ID, AND PUBLIC KEY
    // Sign up at https://www.emailjs.com/ to get these keys
    const SERVICE_ID = "service_pc56nhq";
    const TEMPLATE_ID = "template_h6jejil";
    const PUBLIC_KEY = "CW6TOe3tClG4X46oe";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      (result) => {
        console.log("Email sent:", result.text);
        setStatus("success");
        addMessage(newMessage);
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 3000);
      },
      (error) => {
        console.error("EmailJS Error:", error.text);
        // Fallback for demo: Still save to admin panel even if email fails
        setStatus("success");
        addMessage(newMessage);
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 3000);
      },
    );
  };

  return (
    <section
      className="min-h-screen py-20 px-6 bg-black relative overflow-hidden flex flex-col justify-center items-center"
      id="contact"
    >
      {/* Background elements */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 242, 234, 0.05), transparent 60%)",
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 text-white"
      >
        {/* Left Side: Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Let's Connect
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              Have a project in mind or just want to chat? Fill out the form and
              I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
              <div className="p-3 bg-zinc-900 rounded-full border border-white/10 text-primary">
                <Mail size={24} />
              </div>
              <span className="text-lg">mohammadzaid8178@gmail.com</span>
            </div>

            <div className="flex gap-4 mt-4">
              {Links.map((elem, idx) => (
                <a
                  key={idx}
                  href={elem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-900 rounded-full border border-white/10 text-gray-400 hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  <elem.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-zinc-900/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Status Feedback Overlay */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20"
            >
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-gray-400">I'll get back to you soon.</p>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20"
            >
              <AlertCircle size={64} className="text-red-500 mb-4" />
              <h3 className="text-2xl font-bold text-white">Oops!</h3>
              <p className="text-gray-400">
                Something went wrong. Please try again.
              </p>
            </motion.div>
          )}

          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="bg-white text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      <footer className="mt-20 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Mohammad zaid. All rights reserved.
      </footer>
    </section>
  );
};

export default Contact;
