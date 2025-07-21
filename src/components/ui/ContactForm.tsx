import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" value={form.message} onChange={handleChange} required />
          </div>
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </Button>
          {status === "sent" && <p className="text-green-600">Message sent successfully!</p>}
          {status === "error" && <p className="text-red-600">Something went wrong.</p>}
        </form>
      </CardContent>
    </Card>
  );
};
