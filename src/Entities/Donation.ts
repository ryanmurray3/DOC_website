// Optional: JSON Schema for validation or dynamic form builders
export const DonationSchema = {
  name: "Donation",
  type: "object",
  properties: {
    donor_name: {
      type: "string",
      description: "Donor's name"
    },
    donor_email: {
      type: "string",
      description: "Donor's email"
    },
    amount: {
      type: "number",
      description: "Donation amount"
    },
    donation_type: {
      type: "string",
      enum: ["general", "building", "outreach", "education", "emergency"],
      description: "Type of donation"
    },
    frequency: {
      type: "string",
      enum: ["one-time", "monthly", "quarterly", "annually"],
      description: "Donation frequency"
    },
    message: {
      type: "string",
      description: "Optional message from donor"
    },
    anonymous: {
      type: "boolean",
      default: false,
      description: "Anonymous donation"
    }
  },
  required: [
    "donor_name",
    "donor_email",
    "amount",
    "donation_type",
    "frequency"
  ]
};

// Interface for structured donation entries (e.g., database/API)
export interface DonationType {
  id: string;
  name: string;
  email: string;
  amount: number;
  message?: string;
  recurring: boolean;
  fund: "general" | "building" | "outreach" | "education" | "emergency";
}

// Example service with mock data (can be swapped with real API later)
export const DonationService = {
  async list(): Promise<DonationType[]> {
    return [
      {
        id: "d1",
        name: "Anna Grace",
        email: "anna@example.com",
        amount: 100,
        message: "Keep up the great work!",
        recurring: false,
        fund: "outreach"
      }
    ];
  }
};
