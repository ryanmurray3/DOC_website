{
  "name": "Gallery",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Media title"
    },
    "description": {
      "type": "string",
      "description": "Media description"
    },
    "media_url": {
      "type": "string",
      "description": "URL of the media file"
    },
    "media_type": {
      "type": "string",
      "enum": [
        "image",
        "video"
      ],
      "description": "Type of media"
    },
    "event_date": {
      "type": "string",
      "format": "date",
      "description": "Date when photo/video was taken"
    },
    "category": {
      "type": "string",
      "enum": [
        "worship",
        "community",
        "outreach",
        "facilities",
        "special"
      ],
      "description": "Media category"
    },
    "featured": {
      "type": "boolean",
      "default": false,
      "description": "Featured media"
    }
  },
  "required": [
    "title",
    "media_url",
    "media_type"
  ]
}