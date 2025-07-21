// Optional: Schema for validation or form builders
export const EventSchema = {
  name: "Event",
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Event title"
    },
    description: {
      type: "string",
      description: "Event description"
    },
    date: {
      type: "string",
      format: "date",
      description: "Event date"
    },
    time: {
      type: "string",
      description: "Event time"
    },
    location: {
      type: "string",
      description: "Event location"
    },
    category: {
      type: "string",
      enum: ["worship", "community", "outreach", "education", "special"],
      description: "Event category"
    },
    featured: {
      type: "boolean",
      default: false,
      description: "Featured event"
    }
  },
  required: ["title", "date", "time"]
};

// Event interface
export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "worship" | "community" | "outreach" | "education" | "special";
  featured?: boolean;
}


// Mock data provider
export const EventMock = {
  async list(order: string): Promise<EventItem[]> {
    const events: EventItem[] = [ 
      {
        id: "1",
        title: "Sunday Worship",
        description: "Join us for our weekly worship service.",
        date: "2024-06-09",
        time: "10:00 AM",
        location: "Main Sanctuary",
        category: "worship",
        featured: true
      },
      {
        id: "2",
        title: "Community Potluck",
        description: "Bring a dish to share and enjoy fellowship.",
        date: "2024-06-15",
        time: "6:00 PM",
        location: "Fellowship Hall",
        category: "community"
      }
    ];

    if (order === "date") {
      return events.sort((a, b) => a.date.localeCompare(b.date));
    }
    if (order === "featured") {
      return events.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return events;
  }
};

// Simulated API Service (could call real API in future)
export const EventService = {
  async list(order: string): Promise<EventItem[]> {
    return [
      {
        id: "3",
        title: "Community Outreach",
        description: "Join us to help the local shelter.",
        category: "outreach",
        date: "2025-08-01",
        time: "10:00 AM",
        location: "123 Church Street",
        featured: false
      }
    ];
  }
};
