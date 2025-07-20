import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea ref={ref} className={`border p-2 rounded ${className}`} {...props} />
  )
);
Textarea.displayName = "Textarea";
