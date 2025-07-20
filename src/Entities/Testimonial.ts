{
  "name": "Testimonial",
  "type": "object",
  "properties": {
    "author_name": {
      "type": "string",
      "description": "Author's name"
    },
    "content": {
      "type": "string",
      "description": "Testimonial content"
    },
    "role": {
      "type": "string",
      "description": "Author's role or position"
    },
    "years_member": {
      "type": "number",
      "description": "Years as member"
    },
    "featured": {
      "type": "boolean",
      "default": false,
      "description": "Featured testimonial"
    },
    "approved": {
      "type": "boolean",
      "default": false,
      "description": "Approved for display"
    }
  },
  "required": [
    "author_name",
    "content"
  ]
}