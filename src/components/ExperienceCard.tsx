import React from "react";
import { Link } from "react-router-dom";

interface ExperienceCardProps {
  id: string;
  title: string;
  excerpt: string;
}

export default function ExperienceCard({ id, title, excerpt }: ExperienceCardProps) {
  return (
    <Link to={`/experience/${id}`}>
      <div className="bg-white bg-opacity-10 backdrop-blur border border-white/10 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 cursor-pointer text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm">{excerpt}</p>
      </div>
    </Link>
  );
}
