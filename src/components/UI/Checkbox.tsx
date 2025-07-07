import { CheckIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { Icon } from "./Icon";

export interface ICheckboxProps {
    label?: string;
    key?: string | number;
    value: boolean;
    onChange?: (key: string | number, newValue: boolean) => void;
}

const Checkbox = ({ label, key, value, onChange }: ICheckboxProps) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (onChange) {
            onChange(key, !value);
        }
    };

    return (
        <div className="flex gap-2 cursor-pointer" onClick={handleClick}>
            <div className="flex justify-center items-center w-6 h-6 rounded-md border border-slate-400">
                {value && <Icon icon={CheckIcon} />}
            </div>
            {label}
        </div>
    );
};

export default Checkbox;
