import React, { useState } from "react";
import { DonationSchema, DonationService } from "@/Entities/Donation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Building, Users, BookOpen, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/ui/Header";
import DonationForm from "@/components/ui/DonationForm"; // or "@/components/DonationForm"


export default function DonatePage() {
  return (
    <>
      <Header />
      <div className="bg-warm-cream text-stone-800 dark:bg-zinc-900 dark:text-white">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="py-16 px-6 max-w-7xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Donate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your support helps us continue our mission.</p>
            </CardContent>
          </Card>

          {/* ✅ Here's where the donation form is rendered */}
          <div className="mt-12 max-w-2xl mx-auto">
            <DonationForm />
          </div>
        </motion.section>
      </div>
    </>
  );
}
