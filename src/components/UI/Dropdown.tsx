import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon, IIconProps } from "./Icon";
import Input from "./Input";

export interface IDropdownOption {
    key: string | number;
    value: string;
    icon?: IIconProps;
}

export interface IDropdownProps {
    label?: string;
    options?: IDropdownOption[];
    initialKey?: string;
    onClick?: () => void;
    onChange?: (key: string | number, option: IDropdownOption) => void;
    onSubmitNewOption?: (value: string) => void;
}

const Dropdown = ({
    label,
    options,
    initialKey,
    onClick,
    onChange,
    onSubmitNewOption,
}: IDropdownProps) => {
    const [selectedKey, setSelectedKey] = useState<string>(initialKey);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption: IDropdownOption = useMemo(() => {
        return options?.find((option) => option.key === selectedKey);
    }, [options, selectedKey]);

    const handleClick = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
        if (onClick) {
            onClick();
        }
    };

    const onClickOutside = (e: MouseEvent) => {
        const path =
            ((e as any).path as HTMLDivElement[]) || e.composedPath
                ? e.composedPath()
                : [];
        const isInDropdown = path.some((p) => p === dropdownRef.current);

        if (!isInDropdown) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (isOpen) {
                document.addEventListener("click", onClickOutside);
            } else {
                document.removeEventListener("click", onClickOutside);
            }
        }, 10);
        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, [isOpen]);

    const handleChange = (option: IDropdownOption) => {
        setSelectedKey(option.key as string);
        if (onChange) {
            onChange(option.key, option);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative w-48">
            <button
                className="bg-slate-200 p-3 rounded-lg w-full flex justify-between items-center"
                onClick={handleClick}
            >
                {selectedKey ? (
                    <div className="flex gap-4 items-center mr-4">
                        {selectedOption.icon && (
                            <Icon {...selectedOption.icon} />
                        )}
                        {selectedOption.value}
                    </div>
                ) : (
                    label
                )}
                <Icon icon={ChevronDownIcon} />
            </button>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={`absolute w-full z-10 bg-slate-200 rounded-lg`}
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="flex gap-4 p-2 m-1 items-center rounded-lg hover:bg-slate-300"
                            onClick={() => handleChange(option)}
                        >
                            {option.icon && <Icon {...option.icon} />}
                            {option.value}
                        </div>
                    ))}
                    {onSubmitNewOption && (
                        <div className="flex m-1 items-center rounded-lg z-10">
                            <Input
                                label="Add session"
                                icon={{ icon: PlusIcon }}
                                onSubmit={(value) => {
                                    console.log(value);
                                    onSubmitNewOption(value.toString());
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
