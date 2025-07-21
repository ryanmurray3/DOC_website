import React, { useState } from "react";
import { DonationService } from "@/Entities/Donation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Building, Users, BookOpen, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";



interface DonationType {
  value: string;
  label: string;
  icon: React.ElementType;
  description: string;
}
const donationTypes: DonationType[] = [
  { value: "general", label: "General", icon: Heart, description: "Support our general operations." },
  { value: "building", label: "Building", icon: Building, description: "Contribute to our infrastructure." },
  { value: "outreach", label: "Outreach", icon: Users, description: "Help us reach more people." },
  { value: "education", label: "Education", icon: BookOpen, description: "Support our educational programs." },
  { value: "emergency", label: "Emergency", icon: AlertCircle, description: "Assist in emergency situations." }
];

export default function DonatePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Donate</h1>
      <p className="mt-4">Thank you for your generous support.</p>
      {/* Add form or data as needed */}
    </div>
  );
}
