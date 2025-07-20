import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input ref={ref} className={`border p-2 rounded ${className}`} {...props} />
  )
);
Input.displayName = "Input";

export const InputGroup = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;

