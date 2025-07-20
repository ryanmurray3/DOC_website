import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", ...props }, ref) => (
    <input ref={ref} type="checkbox" className={`form-checkbox ${className}`} {...props} />
  )
);
Checkbox.displayName = "Checkbox";
