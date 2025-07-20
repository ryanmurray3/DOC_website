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

// ... keep existing code (DonationFormData interface)

interface DonationType {
  value: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

export default function Donate() {
// ... keep existing code
}