// Optional: JSON Schema for dynamic forms or validation
export const TestimonialSchema = {
  name: "Testimonial",
  type: "object",
  properties: {
    author_name: {
      type: "string",
      description: "Author's name"
    },
    content: {
      type: "string",
      description: "Testimonial content"
    },
    role: {
      type: "string",
      description: "Author's role or position"
    },
    years_member: {
      type: "number",
      description: "Years as member"
    },
    featured: {
      type: "boolean",
      default: false,
      description: "Featured testimonial"
    },
    approved: {
      type: "boolean",
      default: false,
      description: "Approved for display"
    }
  },
  required: ["author_name", "content"]
};

// TypeScript interface for testimonials
export interface TestimonialType {
  id: string;
  content: string;
  author_name: string;
  role: string;
  featured: boolean;
  approved: boolean;
}

// Mock service for fetching testimonials
export const TestimonialService = {
  async list(): Promise<TestimonialType[]> {
    return [
      {
        id: "t1",
        content: "This church changed my life!",
        author_name: "Jane Doe",
        role: "Volunteer",
        featured: true,
        approved: true
      },
      {
        id: "t2",
        content: "An amazing place to connect and grow.",
        author_name: "John Smith",
        role: "Member",
        featured: false,
        approved: true
      }
    ];
  }
};
