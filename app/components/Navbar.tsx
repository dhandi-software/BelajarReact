import React, { useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import NavbarToggleButton from "../components/buttons/NavbarToggleButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/pedro/about" },
    { name: "Finances", path: "/finances" },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
    }`;
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold text-slate-900">Dhandi App</div>

        {/*  Desktop Menu*/}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path} className={navLinkClasses}>
              {item.name}
            </NavLink>
          ))}
        </div>
        {/* Button Humberger */}
        <NavbarToggleButton
          isOpen={isOpen}
          toggleMenu={() => setIsOpen(!isOpen)}
        />
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md shadow-sm"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={navLinkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  {" "}
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
