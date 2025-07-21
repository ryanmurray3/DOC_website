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
          <Link to={createPageUrl("")}>Home </Link>
          <Link to={createPageUrl("About")}>About </Link>
          <Link to={createPageUrl("Events")}>Events </Link>
          <Link to={createPageUrl("Gallery")}>Gallery </Link>
          <Link to={createPageUrl("Experience")}>Experience </Link>
          <Link to={createPageUrl("Donate")}>Donate </Link>
          <Link to={createPageUrl("Contact")}>Contact</Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-deep-burgundy dark:text-white focus:outline-none">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
  <div className="relative z-50">
    <div className="absolute right-4 top-12 bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 w-48">
      <ul className="space-y-2 text-deep-burgundy dark:text-white">
        <li><Link to={createPageUrl("Home")} onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to={createPageUrl("About")} onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to={createPageUrl("Events")} onClick={() => setMenuOpen(false)}>Events</Link></li>
        <li><Link to={createPageUrl("Gallery")} onClick={() => setMenuOpen(false)}>Gallery</Link></li>
        <li><Link to={createPageUrl("Experience")} onClick={() => setMenuOpen(false)}>Experience</Link></li>
        <li><Link to={createPageUrl("Donate")} onClick={() => setMenuOpen(false)}>Donate</Link></li>
        <li><Link to={createPageUrl("Contact")} onClick={() => setMenuOpen(false)}>Contact</Link></li>
      </ul>
    </div>
  </div>
)}

    </header>
  );
}
