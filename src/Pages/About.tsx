import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, BookOpen, Globe, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/ui/Header";


export default function About() {
  const coreValues: CoreValue[] = [
    { icon: Users, title: "Community", description: "We foster a welcoming and inclusive environment." },
    { icon: Heart, title: "Compassion", description: "We serve with love and empathy." },
    { icon: BookOpen, title: "Education", description: "We promote learning and spiritual growth." },
    { icon: Globe, title: "Outreach", description: "We reach out to those in need." }
  ];
  const milestones: Milestone[] = [
    { year: 1985, title: "Foundation", description: "The congregation was founded to serve the community.", icon: Users },
    { year: 1995, title: "First Outreach Program", description: "Launched our first outreach program to help local families.", icon: Heart },
    { year: 2005, title: "Educational Initiatives", description: "Started educational programs for children and adults.", icon: BookOpen },
    { year: 2015, title: "Global Mission", description: "Expanded our mission to include international outreach.", icon: Globe }
  ];

  interface Milestone {
    year: number;
    title: string;
    description: string;
    icon: React.ElementType;
  }

  interface CoreValue {
    icon: React.ElementType;
    title: string;
    description: string;
  }

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
              <CardTitle className="text-3xl font-bold">About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Learn more about our mission, values, and community impact.</p>
              <Button variant="default" size="lg" asChild>
                <a href="/mission" className="flex items-center">
                  <ExternalLink className="mr-2" />
                  Our Mission
                </a>
              </Button>
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <CardContent className="flex flex-col items-center text-center">
                  <value.icon className="h-8 w-8 mb-2 text-deep-burgundy" />
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
    </>
  );
}

