import { useEffect, useState } from "react";
import { Icon, IIconProps } from "./Icon";

export interface IInputAlertProps {
    label?: string;
    icon?: IIconProps;
}

export interface IInputProps {
    label?: string;
    value?: string | number;
    icon?: IIconProps;
    onChange?: (newValue: string | number) => void;
    onSubmit?: (value: string | number) => void;
    isTimer?: boolean;
    error?: IInputAlertProps;
    forceFocus?: boolean;
}

const Input = ({
    label,
    value: initialValue,
    icon,
    onChange,
    onSubmit,
    isTimer,
    error,
    forceFocus,
}: IInputProps) => {
    const [value, setValue] = useState<string | number>(initialValue || "");
    const [isFocused, setIsFocused] = useState<boolean>(forceFocus || false);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (isFocused && event.key === "Enter") {
            handleSubmit?.(value);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value);

        onChange?.(value);
    };

    const handleFocus = (e?: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
    };

    const handleClickIcon = () => {
        if (isFocused) {
            handleSubmit?.(value);
        }
    };

    const handleSubmit = (value: string | number) => {
        onSubmit?.(value);

        setTimeout(() => {
            if (!error || error === undefined) {
                setValue("");
            }
        }, 10);
    };

    useEffect(() => {
        if (isFocused) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isFocused]);

    return (
        <div
            className={`flex flex-col gap-2 ${
                isTimer && "justify-center w-2/3 max-w-[640px]"
            }`}
        >
            <div className={`relative`}>
                <input
                    className={`
                        flex align-center rounded-lg w-full border border-1 border-slate-400
                        ${
                            isTimer
                                ? "rounded-lg p-3 font-vt323 text-9xl text-center shadow-emboss"
                                : "rounded-lg p-2"
                        }
                        ${
                            error
                                ? "border-red-600 focus:border-2 outline-none"
                                : "border-slate-400 focus:border-2 focus:border-black outline-none"
                        }
                        `}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={value}
                    autoFocus={forceFocus}
                />
                {!isFocused && !value && (
                    <div className="absolute inset-y-0 left-0 px-2 h-full flex items-center text-slate-400 pointer-events-none">
                        {label}
                    </div>
                )}
                <div
                    className={`absolute inset-y-0 right-0 px-2 py-1 h-full flex gap-2 items-center text-slate-400 hover:text-black cursor-pointer`}
                    onClick={icon?.onClick}
                >
                    {!isTimer && <Icon {...icon} />}
                </div>
            </div>

            {error && (
                <div className="flex justify-between gap-3 text-red-600">
                    {error.label}
                    <Icon {...error.icon} />
                </div>
            )}
        </div>
    );
};

export default Input;
