import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// Define the allowed variants and sizes
type Variant = "default" | "link" | "outline";
type Size = "sm" | "default" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      asChild = false,
      variant = "default",
      size = "default",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const baseClass = "inline-flex items-center justify-center rounded font-medium transition-colors duration-200";

    const variantClasses: Record<Variant, string> = {
      default: "bg-deep-burgundy text-white hover:bg-burgundy-dark",
      link: "bg-transparent underline text-red-800 p-0 hover:text-red-600",
      outline: "border border-current bg-transparent hover:bg-current hover:text-white",
    };

    const sizeClasses: Record<Size, string> = {
      sm: "px-2 py-1 text-sm",
      default: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <Comp
        ref={ref}
        className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
