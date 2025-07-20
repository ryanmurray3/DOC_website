{
  "name"; "Event"
  "type"; "object"
  "properties"; {
    "title"; {
      "type"; "string"
      "description"; "Event title"
    }
    "description"; {
      "type"; "string"
      "description"; "Event description"
    }
    "date"; {
      "type"; "string"
      "format"; "date"
      "description"; "Event date"
    }
    "time"; {
      "type"; "string"
      "description"; "Event time"
    }
    "location"; {
      "type"; "string"
      "description"; "Event location"
    }
    "category"; {
      "type"; "string"
      "enum"; [
        "worship",
        "community",
        "outreach",
        "education",
        "special"
      ]
      "description"; "Event category"
    }
    "featured"; {
      "type"; "boolean"
      "default"; false
      "description"; "Featured event"
    }
  }
  "required"; [
    "title",
    "date",
    "time"
  ]
}
export {};