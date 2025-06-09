import { atom } from "jotai";
import type { PenaltyType, Result } from "../types/results";
import {
    addPenaltyAtom,
    addResultAtom,
    filteredResultsAtom,
} from "./resultAtoms";
import { scrambleAtom } from "./scrambleAtoms";
import { selectedEventAtom, selectedSessionAtom } from "./sessionAtoms";

export const withInspectionAtom = atom(true);
export const isManualEnterAtom = atom(false);
export const isRunningTimerAtom = atom(false);
export const isRunningInspectionAtom = atom(false);
export const isSpacebarPressedAtom = atom(false);
export const justStoppedAtom = atom(false);
export const canRestartAtom = atom(true);
export const elapsedTimeAtom = atom(0);
export const inspectionTimeAtom = atom(15);
export const cachedInspectionPenaltyAtom = atom<PenaltyType>(null);
export const manualTimeErrorAtom = atom<string | undefined>(undefined);
export const isOpenManualInfoModalAtom = atom(false);

export const timerIntervalIdAtom = atom<number | undefined>(undefined);
export const inspectionIntervalIdAtom = atom<number | undefined>(undefined);

const parseSeconds = (seconds: string): number => {
    const formattedSeconds = seconds.replace(",", ".");
    if (formattedSeconds.includes(".")) {
        return parseFloat(formattedSeconds);
    } else {
        return parseFloat(
            formattedSeconds.slice(0, -2) + "." + formattedSeconds.slice(-2)
        );
    }
};

const parseTime = (enteredTime: string): number | undefined => {
    const regex = new RegExp(/^(\d*[:]?)(\d*[:]?)(\d*[,.]?)(\d*$)/);
    if (!regex.test(enteredTime)) return;

    const timeComponents = enteredTime.split(":");
    let hours = 0,
        minutes = 0,
        seconds = 0;

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

    const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    return totalSeconds;
};

export const startTimerAtom = atom(null, (get, set) => {
    const inspectionIntervalId = get(inspectionIntervalIdAtom);
    if (inspectionIntervalId) {
        clearInterval(inspectionIntervalId);
        set(inspectionIntervalIdAtom, undefined);
    }

    set(isRunningInspectionAtom, false);
    set(inspectionTimeAtom, 15);
    set(isRunningTimerAtom, true);
    set(elapsedTimeAtom, 0);

    const intervalId = window.setInterval(() => {
        set(elapsedTimeAtom, (prev) => prev + 0.01);
    }, 10);

    set(timerIntervalIdAtom, intervalId);
});

export const startCountdownAtom = atom(null, (get, set) => {
    set(isRunningInspectionAtom, true);

    const intervalId = window.setInterval(() => {
        set(inspectionTimeAtom, (prev) => {
            const newTime = prev - 1;

            if (newTime < -1) {
                set(cachedInspectionPenaltyAtom, "dnf");
            } else if (newTime < 1 && newTime >= -1) {
                set(cachedInspectionPenaltyAtom, "+2");
            }

            return newTime;
        });
    }, 1000);

    set(inspectionIntervalIdAtom, intervalId);
});

export const stopTimerAtom = atom(null, (get, set) => {
    const timerIntervalId = get(timerIntervalIdAtom);
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
        set(timerIntervalIdAtom, undefined);
    }

    set(isRunningTimerAtom, false);
    set(canRestartAtom, false);

    setTimeout(() => {
        set(canRestartAtom, true);
    }, 200);

    const newResult: Result = {
        time: get(elapsedTimeAtom),
        scramble: get(scrambleAtom),
        date: new Date(),
        event: get(selectedEventAtom),
        session: get(selectedSessionAtom),
        penalty: null,
        comment: "",
    };

    set(addResultAtom, newResult);

    const inspectionPenalty = get(cachedInspectionPenaltyAtom);
    if (inspectionPenalty) {
        const results = get(filteredResultsAtom);
        const latestResult = results[results.length - 1];
        set(addPenaltyAtom, {
            result: latestResult,
            penalty: inspectionPenalty,
        });
        set(cachedInspectionPenaltyAtom, null);
    }
});

export const handleKeyUpAtom = atom(null, (get, set, event: KeyboardEvent) => {
    set(isSpacebarPressedAtom, false);

    if (event.key === " ") {
        if (
            !get(justStoppedAtom) &&
            !get(isRunningTimerAtom) &&
            get(canRestartAtom)
        ) {
            if (get(withInspectionAtom) && !get(isRunningInspectionAtom)) {
                set(startCountdownAtom);
            } else {
                set(startTimerAtom);
            }
        } else {
            set(justStoppedAtom, false);
        }
    }
});

export const handleKeyDownAtom = atom(
    null,
    (get, set, event: KeyboardEvent) => {
        if (get(isRunningTimerAtom)) {
            set(stopTimerAtom);

            if (event.key === " ") {
                set(justStoppedAtom, true);
            }

            if (event.key === "Escape") {
                const results = get(filteredResultsAtom);
                const latestResult = results[results.length - 1];
                set(addPenaltyAtom, { result: latestResult, penalty: "dnf" });
            }
        } else if (
            (get(withInspectionAtom) && get(isRunningInspectionAtom)) ||
            !get(withInspectionAtom)
        ) {
            if (event.key === " ") {
                set(isSpacebarPressedAtom, true);
            }
        }
    }
);

export const submitManualTimeAtom = atom(
    null,
    (get, set, value: string | number) => {
        const resultData = {
            scramble: get(scrambleAtom),
            date: new Date(),
            event: get(selectedEventAtom),
            session: get(selectedSessionAtom),
        };

        const valueAsString = value as string;
        const isDnfFormat =
            valueAsString.toLowerCase().startsWith("dnf(") &&
            valueAsString.endsWith(")");
        const isPlusTwoFormat = valueAsString.endsWith("+");
        const error = "Invalid format";

        let penalty: PenaltyType = null;
        let time = valueAsString;

        if (isDnfFormat) {
            time = time.slice(4, -1);
            penalty = "dnf";
        } else if (isPlusTwoFormat) {
            time = time.slice(0, -1);
            penalty = "+2";
        }

        const parsedTime = parseTime(time);

        if (!parsedTime) {
            set(manualTimeErrorAtom, error);
        } else {
            const newResult: Result = {
                ...resultData,
                time: parsedTime,
                penalty,
                comment: "",
            };
            set(addResultAtom, newResult);
            set(manualTimeErrorAtom, undefined);
        }
    }
);

export const cleanupTimerAtom = atom(null, (get, set) => {
    const timerIntervalId = get(timerIntervalIdAtom);
    const inspectionIntervalId = get(inspectionIntervalIdAtom);

    if (timerIntervalId) {
        clearInterval(timerIntervalId);
        set(timerIntervalIdAtom, undefined);
    }

    if (inspectionIntervalId) {
        clearInterval(inspectionIntervalId);
        set(inspectionIntervalIdAtom, undefined);
    }
});
