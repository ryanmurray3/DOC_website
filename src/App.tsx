// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/Pages/Home";
import Events from "@/Pages/Events";
import ExperiencePage from "@/Pages/Experience";
import GalleryPage from "@/Pages/Gallery";
import DonatePage from "@/Pages/Donate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/donate" element={<DonatePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
