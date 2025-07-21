import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { createPageUrl } from "@/libs/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-deep-burgundy dark:text-white">
          Congregation of the Blessed Sacrament
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-deep-burgundy dark:text-white font-medium">
          <Link to={createPageUrl("Home")}>Home</Link>
          <Link to={createPageUrl("About")}>About</Link>
          <Link to={createPageUrl("Events")}>Events</Link>
          <Link to={createPageUrl("Gallery")}>Gallery</Link>
          <Link to={createPageUrl("Experience")}>Experience</Link>
          <Link to={createPageUrl("Donate")}>Donate</Link>
          <Link to={createPageUrl("Contact")}>Contact</Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-deep-burgundy dark:text-white focus:outline-none">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-zinc-800 text-deep-burgundy dark:text-white font-medium py-4 px-6 space-y-3">
          <Link to={createPageUrl("Home")} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to={createPageUrl("Events")} onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to={createPageUrl("Donate")} onClick={() => setMenuOpen(false)}>Donate</Link>
          <Link to={createPageUrl("Experience")} onClick={() => setMenuOpen(false)}>Experience</Link>
        </nav>
      )}
    </header>
  );
}
