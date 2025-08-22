import type { PenaltyType } from "@/types/results";

export interface formatTimeProps {
    time: number | string | null;
    penalty?: PenaltyType;
    displayTimeOnDnf?: boolean;
}

export function formatTime({
    time,
    penalty,
    displayTimeOnDnf,
}: formatTimeProps): string {
    if (time === "DNF" || time === null || time === undefined) {
        return time === null || time === undefined ? "" : "DNF";
    }

    const numericTime = typeof time === "string" ? parseFloat(time) : time;

    if (typeof numericTime !== "number" || isNaN(numericTime)) {
        return "";
    }

    if (penalty === "dnf") {
        if (!displayTimeOnDnf) {
            return "DNF";
        } else {
            const originalFormattedTime = formatTime({ time: numericTime });
            return `DNF(${originalFormattedTime})`;
        }
    }

    const hours = Math.floor(numericTime / 3600);
    const minutes = Math.floor((numericTime % 3600) / 60);
    const seconds = Math.floor(numericTime % 60);

    const timeAsString = String(numericTime.toFixed(3));
    const parts = timeAsString.split(".");
    const hundredthsString = parts[1] || "";

    const milliseconds = hundredthsString.padEnd(2, "0").substring(0, 2);

    let formattedTime = "";

    if (hours > 0) {
        formattedTime += `${hours}:${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
    } else if (minutes > 0) {
        formattedTime += `${minutes}:${String(seconds).padStart(2, "0")}`;
    } else {
        formattedTime += `${seconds}`;
    }

    formattedTime += `.${milliseconds}`;

    return penalty === "+2" ? `${formattedTime}+` : formattedTime;
}
