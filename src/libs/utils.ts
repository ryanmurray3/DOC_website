// Concatenate classnames
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

// Convert page titles like "Donate" to lowercase URL paths like "/donate"
export function createPageUrl(pageName: string): string {
  return `/${pageName.toLowerCase().replace(/\s+/g, '-')}`;
}
