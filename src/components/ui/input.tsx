import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            inputSize: {
                default: "h-9 px-3 py-1 text-base md:text-sm",
                xl: "h-[100px] px-4 font-timer text-7xl text-center",
            },
        },
        defaultVariants: {
            inputSize: "default",
        },
    }
);

export type InputProps = React.ComponentProps<"input"> &
    VariantProps<typeof inputVariants>;

function Input({ className, type, inputSize, ...props }: InputProps) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(inputVariants({ inputSize, className }))}
            {...props}
        />
    );
}

export { Input };
