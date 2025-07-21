import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function DonationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    type: "One-Time",
    purpose: "General",
    message: "",
    anonymous: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckbox = (checked: boolean) => {
    setFormData({ ...formData, anonymous: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting donation:", formData);
    // Submit to backend or DonationService here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="amount">Donation Amount</Label>
        <Input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
      </div>

      <div>
        <Label>Donation Type</Label>
        <Select onValueChange={(val) => handleSelect("type", val)} defaultValue={formData.type}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="One-Time">One-Time</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Annual">Annual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Purpose</Label>
        <Select onValueChange={(val) => handleSelect("purpose", val)} defaultValue={formData.purpose}>
          <SelectTrigger>
            <SelectValue placeholder="Select Purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Outreach">Outreach</SelectItem>
            <SelectItem value="Building Fund">Building Fund</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea name="message" value={formData.message} onChange={handleChange} />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="anonymous"
          checked={formData.anonymous}
          onChange={(e) => handleCheckbox(e.target.checked)} // ✅ correct native usage
        // <Checkbox
        //     id="some-id"
        //     checked={isChecked}
        //     onChange={(e) => setIsChecked(e.target.checked)} // ✅ correct native usage
        />

        <Label htmlFor="anonymous">Donate Anonymously</Label>
      </div>

      <Button type="submit" className="w-full bg-accent-gold text-black hover:bg-yellow-500">
        Donate Now
      </Button>
    </form>
  );
}
