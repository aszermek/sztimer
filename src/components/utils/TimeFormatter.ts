import { PenaltyTypes } from "../../models/IResult";

export interface ITimeFormatterProps {
    time: number | string | null;
    penalty?: PenaltyTypes;
    displayTimeOnDnf?: boolean;
    isExcluded?: boolean;
}

export function TimeFormatter({
    time,
    penalty,
    displayTimeOnDnf,
    isExcluded,
}: ITimeFormatterProps): string {
    if (time === "DNF") {
        return "DNF";
    }

    if (typeof time === "number") {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = (time % 1).toFixed(2).substring(2);
        const formattedTime = `${hours > 0 ? hours + ":" : ""}${
            hours > 0 && minutes < 10 ? "0" : ""
        }${minutes > 0 ? minutes + ":" : ""}${
            minutes > 0 && seconds < 10 ? "0" : ""
        }${seconds}.${milliseconds}`;

        if (penalty === "dnf") {
            if (!displayTimeOnDnf) {
                return "DNF";
            } else {
                return `DNF(${formattedTime})`;
            }
        }
        if (penalty === "+2") {
            return `${formattedTime}+`;
        }
        return formattedTime;
    }
    return "-";
}
