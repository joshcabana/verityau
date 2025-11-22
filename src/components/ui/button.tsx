import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white rounded-[16px] hover:scale-[1.05] active:scale-[0.98] shadow-md hover:shadow-coral-glow hover:shadow-2xl",
        destructive: "bg-destructive text-white rounded-[16px] hover:bg-destructive/90 hover:shadow-lg hover:scale-[1.05]",
        outline: "border-2 border-primary/30 bg-transparent text-primary rounded-[16px] hover:bg-primary/10 hover:border-primary hover:scale-[1.05] hover:shadow-coral-glow",
        secondary: "bg-secondary text-secondary-foreground rounded-[16px] hover:bg-secondary/90 hover:scale-[1.05]",
        ghost: "rounded-[16px] hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-10 px-5 py-3",
        lg: "h-16 px-10 py-5 text-base",
        icon: "h-14 w-14",
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
