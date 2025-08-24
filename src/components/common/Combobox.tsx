import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretUpDownIcon, CheckIcon, TrashIcon } from "@phosphor-icons/react";
import React, { useState } from "react";

export interface ComboboxOption {
    value: string;
    label: string;
    icon?: React.ElementType;
    isDeletable?: boolean;
}

export interface ComboboxProps {
    options: ComboboxOption[];
    value: string;
    onChange: (value: string) => void;

    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onCreate?: (value: string) => void;
    onDelete?: (value: string) => void;

    placeholder?: string;
    buttonProps?: React.ComponentProps<typeof Button>;
    className?: string;
    createLabel?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
    options,
    value,
    onChange,
    searchValue = "",
    onSearchChange,
    onCreate,
    onDelete,
    placeholder = "Select an option...",
    buttonProps,
    className,
    createLabel = "Create",
}) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((o) => o.value === value);

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        onSearchChange?.("");
        setOpen(false);
    };

    const handleCreate = () => {
        onCreate?.(searchValue);
        handleSelect(searchValue);
    };

    const handleDelete = (e: React.MouseEvent, optionValue: string) => {
        e.stopPropagation();
        onDelete?.(optionValue);
    };

    const canCreate =
        onCreate &&
        searchValue.length > 0 &&
        !options.some((o) => o.value === searchValue);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    {...buttonProps}
                    className={cn("w-[200px] py-3", className)}
                >
                    {selectedOption?.icon && (
                        <selectedOption.icon className="mr-1 h-full aspect-square size-auto shrink-0" />
                    )}
                    {selectedOption?.label || placeholder}
                    <CaretUpDownIcon className="opacity-50 h-full aspect-square size-auto ml-auto" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0"
                style={{ width: "var(--radix-popover-trigger-width)" }}
            >
                <Command>
                    <CommandInput
                        placeholder={`Search${onCreate ? " or create" : ""}...`}
                        value={searchValue}
                        onValueChange={onSearchChange}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {canCreate ? " " : "No results found."}
                        </CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    <div className="flex items-center">
                                        {option.icon && (
                                            <option.icon className="mr-2 h-4 w-4 shrink-0" />
                                        )}
                                        <span>{option.label}</span>
                                    </div>
                                    <div className="flex items-center ml-auto gap-1">
                                        {value === option.value && (
                                            <CheckIcon size={14} />
                                        )}
                                        {option.isDeletable && onDelete && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-min w-min"
                                                onClick={(e) =>
                                                    handleDelete(
                                                        e,
                                                        option.value
                                                    )
                                                }
                                                aria-label={`Delete ${option.label}`}
                                            >
                                                <TrashIcon
                                                    size={14}
                                                    className="text-red-500"
                                                />
                                            </Button>
                                        )}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        {canCreate && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={handleCreate}
                                        className="text-green-600"
                                    >
                                        {createLabel} "{searchValue}"
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
