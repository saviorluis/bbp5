import NextLink from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-secondary font-medium",
        underline: "text-primary hover:text-secondary underline-offset-4 hover:underline",
        secondary: "text-secondary hover:text-secondary/80",
        subtle: "text-muted-foreground hover:text-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "text-destructive hover:text-destructive/90",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Link = ({ 
  href, 
  className, 
  variant, 
  size, 
  children, 
  ...props 
}) => {
  return (
    <NextLink
      href={href}
      className={cn(linkVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </NextLink>
  );
};

Link.displayName = "Link";

export { Link, linkVariants }; 