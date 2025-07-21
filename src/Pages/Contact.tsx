import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/ui/Header";
import { ContactForm } from "@/components/ui/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="bg-warm-cream dark:bg-zinc-900 text-stone-800 dark:text-white py-16 px-6 min-h-screen">
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </>
  );
}
