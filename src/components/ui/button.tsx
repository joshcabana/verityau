import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white rounded-full hover:scale-[1.05] active:scale-[0.98] shadow-lg hover:shadow-golden-glow",
        destructive: "bg-destructive text-white rounded-full hover:bg-destructive/90 hover:shadow-lg hover:scale-[1.05]",
        outline: "border-2 border-primary/30 bg-transparent text-primary rounded-full hover:bg-primary/10 hover:border-primary hover:scale-[1.05] hover:shadow-golden-glow",
        secondary: "bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 hover:scale-[1.05]",
        ghost: "rounded-full hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-16 px-12 py-5",
        sm: "h-12 px-8 py-4",
        lg: "h-20 px-16 py-6 text-base",
        icon: "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
