// Concatenate classnames
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

// utils/url.ts
export function createPageUrl(input: string): string {
  const normalized = input.trim().toLowerCase().replace(/\s+/g, '-');
  return normalized === "" ? "/" : `/${normalized}`;
}


