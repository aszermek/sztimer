import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react";
import React, { useState } from "react";

export interface ComboboxOption {
    value: string;
    label: string;
    icon?: React.ElementType;
}

export interface ComboboxProps {
    options: ComboboxOption[];
    placeholder?: string;
    onChange?: (value: string) => void;
    value?: string;
    buttonProps?: React.ComponentProps<typeof Button>;
    className?: string;
}

export const Combobox = ({
    options,
    placeholder = "Select an option...",
    onChange,
    value: controlledValue,
    buttonProps,
    className,
}: ComboboxProps) => {
    const [open, setOpen] = useState(false);
    const [uncontrolledValue, setUncontrolledValue] = useState("");

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleSelect = (selected: string) => {
        if (!isControlled) setUncontrolledValue(selected);
        onChange?.(selected);
        setOpen(false);
    };

    const selectedOption = options.find((o) => o.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] py-3", className)}
                    {...buttonProps}
                >
                    {selectedOption?.icon && (
                        <selectedOption.icon className="mr-1 h-full aspect-square size-auto shrink-0" />
                    )}
                    {selectedOption?.label || placeholder}
                    <CaretUpDownIcon className="opacity-50 h-full aspect-square size-auto ml-auto" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    {option.icon && (
                                        <option.icon className="mr-1 h-4 w-4 shrink-0" />
                                    )}
                                    {option.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
