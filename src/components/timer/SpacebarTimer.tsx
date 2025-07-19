import { filteredResultsAtom } from "@/atoms/resultAtoms";
import {
    cleanupTimerAtom,
    elapsedTimeAtom,
    handleKeyDownAtom,
    handleKeyUpAtom,
    inspectionTimeAtom,
    isRunningInspectionAtom,
    isRunningTimerAtom,
    isSpacebarPressedAtom,
} from "@/atoms/timerAtoms";
import { formatTime } from "@/lib/formatTime";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect } from "react";

export const SpacebarTimer: React.FC = () => {
    const isRunningTimer = useAtomValue(isRunningTimerAtom);
    const isRunningInspection = useAtomValue(isRunningInspectionAtom);
    const isSpacebarPressed = useAtomValue(isSpacebarPressedAtom);
    const elapsedTime = useAtomValue(elapsedTimeAtom);
    const inspectionTime = useAtomValue(inspectionTimeAtom);

    const filteredResults = useAtomValue(filteredResultsAtom);

    const handleKeyUp = useSetAtom(handleKeyUpAtom);
    const handleKeyDown = useSetAtom(handleKeyDownAtom);
    const cleanup = useSetAtom(cleanupTimerAtom);

    useEffect(() => {
        const keyUpHandler = (event: KeyboardEvent) => {
            handleKeyUp(event);
        };

        const keyDownHandler = (event: KeyboardEvent) => {
            handleKeyDown(event);
        };

        document.addEventListener("keyup", keyUpHandler);
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keyup", keyUpHandler);
            document.removeEventListener("keydown", keyDownHandler);
            cleanup();
        };
    }, [handleKeyUp, handleKeyDown, cleanup]);

    const latestResult = filteredResults[filteredResults.length - 1];

    if (isRunningInspection) {
        return (
            <div
                className={`text-9xl font-timer ${
                    isSpacebarPressed ? "text-green-500" : ""
                }`}
            >
                {inspectionTime >= 1 && inspectionTime}
                {inspectionTime < 1 && inspectionTime >= -1 && "+2"}
                {inspectionTime < -1 && "DNF"}
            </div>
        );
    }

    if (!isRunningTimer) {
        // Timer not running
        if (filteredResults.length === 0) {
            // No results yet (show 0.00)
            return (
                <div
                    className={`text-9xl font-timer ${
                        isSpacebarPressed ? "text-green-500" : ""
                    }`}
                >
                    {formatTime({ time: 0 })}
                </div>
            );
        } else {
            // Session has results (show latest)
            return (
                <div
                    className={`text-9xl font-timer ${
                        isSpacebarPressed ? "text-green-500" : ""
                    }`}
                >
                    {formatTime({
                        time: latestResult.time,
                        penalty: latestResult.penalty,
                        displayTimeOnDnf: true,
                    })}
                </div>
            );
        }
    } else {
        // Timer running
        return (
            <div className="text-9xl font-timer">
                {formatTime({ time: elapsedTime })}
            </div>
        );
    }
};
