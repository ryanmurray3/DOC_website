{
  "name"; "Gallery"
  "type"; "object"
  "properties"; {
    "title"; {
      "type"; "string"
      "description"; "Media title"
    }
    "description"; {
      "type"; "string"
      "description"; "Media description"
    }
    "media_url"; {
      "type"; "string"
      "description"; "URL of the media file"
    }
    "media_type"; {
      "type"; "string"
      "enum"; [
        "image",
        "video"
      ]
      "description"; "Type of media"
    }
    "event_date"; {
      "type"; "string"
      "format"; "date"
      "description"; "Date when photo/video was taken"
    }
    "category"; {
      "type"; "string"
      "enum"; [
        "worship",
        "community",
        "outreach",
        "facilities",
        "special"
      ]
      "description"; "Media category"
    }
    "featured"; {
      "type"; "boolean"
      "default"; false
      "description"; "Featured media"
    }
  }
  "required"; [
    "title",
    "media_url",
    "media_type"
  ]
}
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  media_url: string;
  media_type: "image" | "video";
  category: string;
}

export const GalleryService = {
  async list(): Promise<GalleryItem[]> {
    return [
      {
        id: "g1",
        title: "Youth Camp Highlights",
        description: "Photos from our summer youth camp.",
        media_url: "https://example.com/image1.jpg",
        media_type: "image",
        category: "community"
      },
      {
        id: "g2",
        title: "Sunday Sermon",
        description: "Watch last week's message.",
        media_url: "https://youtube.com/watch?v=abc123",
        media_type: "video",
        category: "worship"
      }
    ];
  }
};
