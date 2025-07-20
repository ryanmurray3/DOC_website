import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, BookOpen, Globe, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Milestone {
// ... keep existing code
}

interface CoreValue {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function About() {
// ... keep existing code