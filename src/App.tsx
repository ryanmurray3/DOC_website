// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/Pages/Home";
import Events from "@/Pages/Events";
import ExperiencePage from "@/Pages/Experience";
import GalleryPage from "@/Pages/Gallery";
import DonatePage from "@/Pages/Donate";
import About from "@/Pages/About";
import ContactPage from "@/Pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
