import type { PenaltyType } from "@/types/results";
import React, { useState } from "react";
import { Input } from "../ui/input";

const parseSeconds = (seconds: string): number => {
    const formattedSeconds = seconds.replace(",", ".");

    // If a decimal is already present, parse it directly.
    // Example: "12.34" -> 12.34
    if (formattedSeconds.includes(".")) {
        return parseFloat(formattedSeconds);
    }

    // If there's no decimal, treat the entire string as an integer
    // representing hundredths of a second, then divide by 100.
    const hundredths = parseInt(formattedSeconds, 10);

    if (isNaN(hundredths)) {
        return NaN;
    }

    // '1'   -> 1 / 100   -> 0.01
    // '74'  -> 74 / 100  -> 0.74
    // '1074' -> 1074 / 100 -> 10.74
    return hundredths / 100;
};

const parseTime = (enteredTime: string): number | undefined => {
    const validCharsRegex = /^[0-9:.,]+$/;
    if (!validCharsRegex.test(enteredTime)) return undefined;

    const timeComponents = enteredTime.split(":");
    let hours = 0,
        minutes = 0,
        seconds = 0;

    try {
        if (timeComponents.length === 3) {
            hours = parseInt(timeComponents[0]);
            minutes = parseInt(timeComponents[1]);
            seconds = parseSeconds(timeComponents[2]);
        } else if (timeComponents.length === 2) {
            minutes = parseInt(timeComponents[0]);
            seconds = parseSeconds(timeComponents[1]);
        } else {
            seconds = parseSeconds(timeComponents[0]);
        }
    } catch (e) {
        return undefined;
    }

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return undefined;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
};

interface TimeInputProps {
    onSubmit: (data: { timeInSeconds: number; penalty: PenaltyType }) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(undefined);
        }
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const value = inputValue.trim();
        if (!value) return;

        let timeStr = value;
        let penalty: PenaltyType = null;

        if (value.toLowerCase().startsWith("dnf(") && value.endsWith(")")) {
            timeStr = value.slice(4, -1);
            penalty = "dnf";
        } else if (value.endsWith("+")) {
            timeStr = value.slice(0, -1);
            penalty = "+2";
        }

        const parsedTime = parseTime(timeStr);

        if (parsedTime === undefined) {
            setError("Invalid format");
        } else {
            onSubmit({ timeInSeconds: parsedTime, penalty });
            setInputValue("");
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <form onSubmit={handleSubmit} className="w-full relative">
                <div className="relative flex items-center">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        autoFocus
                        inputSize="xl"
                    />
                </div>
            </form>
            {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
        </div>
    );
};
