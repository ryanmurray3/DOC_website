{
  "name"; "Donation"
  "type"; "object"
  "properties"; {
    "donor_name"; {
      "type"; "string"
      "description"; "Donor's name"
    }
    "donor_email"; {
      "type"; "string"
      "description"; "Donor's email"
    }
    "amount"; {
      "type"; "number"
      "description"; "Donation amount"
    }
    "donation_type"; {
      "type"; "string"
      "enum"; [
        "general",
        "building",
        "outreach",
        "education",
        "emergency"
      ]
      "description"; "Type of donation"
    }
    "frequency"; {
      "type"; "string"
      "enum"; [
        "one-time",
        "monthly",
        "quarterly",
        "annually"
      ]
      "description"; "Donation frequency"
    }
    "message"; {
      "type"; "string"
      "description"; "Optional message from donor"
    }
    "anonymous"; {
      "type"; "boolean"
      "default"; false
      "description"; "Anonymous donation"
    }
  }
  "required"; [
    "donor_name",
    "donor_email",
    "amount",
    "donation_type",
    "frequency"
  ]
}
export {};
