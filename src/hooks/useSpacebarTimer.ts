import { addResultAtom, filteredResultsAtom } from "@/atoms/resultAtoms";
import { scrambleAtom } from "@/atoms/scrambleAtoms";
import { selectedEventAtom, selectedSessionAtom } from "@/atoms/sessionAtoms";
import {
    isRunningInspectionAtom,
    isRunningTimerAtom,
} from "@/atoms/timerAtoms";
import { formatTime } from "@/lib/formatTime";
import type { Result } from "@/types/results";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

interface UseSpacebarTimerProps {
    withInspection: boolean;
}

type TimerState =
    | "IDLE"
    | "READY"
    | "INSPECTING"
    | "INSPECTING_READY"
    | "TIMING";

export const useSpacebarTimer = ({ withInspection }: UseSpacebarTimerProps) => {
    const setIsRunningTimer = useSetAtom(isRunningTimerAtom);
    const setIsRunningInspection = useSetAtom(isRunningInspectionAtom);
    const addResult = useSetAtom(addResultAtom);
    const scramble = useAtomValue(scrambleAtom);
    const selectedEvent = useAtomValue(selectedEventAtom);
    const selectedSession = useAtomValue(selectedSessionAtom);
    const filteredResults = useAtomValue(filteredResultsAtom);

    const [timerState, setTimerState] = useState<TimerState>("IDLE");
    const [elapsedTime, setElapsedTime] = useState(0);
    const [inspectionTime, setInspectionTime] = useState(15);

    const timerIntervalRef = useRef<number | undefined>(undefined);
    const inspectionIntervalRef = useRef<number | undefined>(undefined);

    const stateRef = useRef({
        timerState,
        elapsedTime,
        inspectionTime,
        withInspection,
    });
    stateRef.current = {
        timerState,
        elapsedTime,
        inspectionTime,
        withInspection,
    };

    useEffect(() => {
        const startInspection = () => {
            setTimerState("INSPECTING");
            setIsRunningInspection(true);
            setInspectionTime(15);
            inspectionIntervalRef.current = window.setInterval(() => {
                setInspectionTime((prev) => prev - 1);
            }, 1000);
        };

        const startTimer = () => {
            clearInterval(inspectionIntervalRef.current);
            setTimerState("TIMING");
            setIsRunningTimer(true);
            setIsRunningInspection(false);
            const startTime = performance.now();
            timerIntervalRef.current = window.setInterval(() => {
                setElapsedTime((performance.now() - startTime) / 1000);
            }, 10);
        };

        const stopTimer = () => {
            clearInterval(timerIntervalRef.current);
            setTimerState("IDLE");
            setIsRunningTimer(false);

            const {
                elapsedTime: finalTime,
                inspectionTime: finalInspectionTime,
            } = stateRef.current;
            const finalPenalty =
                finalInspectionTime < 1
                    ? finalInspectionTime < -1
                        ? "dnf"
                        : "+2"
                    : null;

            const newResult: Result = {
                time: finalTime,
                scramble: scramble,
                date: new Date(),
                event: selectedEvent,
                session: selectedSession,
                penalty: finalPenalty,
                comment: "",
            };
            addResult(newResult);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== " ") return;
            event.preventDefault();

            const { timerState: currentState } = stateRef.current;
            switch (currentState) {
                case "IDLE":
                    setTimerState("READY");
                    break;
                case "INSPECTING":
                    setTimerState("INSPECTING_READY");
                    break;
                case "TIMING":
                    stopTimer();
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key !== " ") return;
            event.preventDefault();

            const {
                timerState: currentState,
                withInspection: currentWithInspection,
            } = stateRef.current;
            switch (currentState) {
                case "READY":
                    if (currentWithInspection) {
                        startInspection();
                    } else {
                        startTimer();
                    }
                    break;
                case "INSPECTING_READY":
                    startTimer();
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            clearInterval(timerIntervalRef.current);
            clearInterval(inspectionIntervalRef.current);
        };
    }, [
        addResult,
        scramble,
        selectedEvent,
        selectedSession,
        setIsRunningInspection,
        setIsRunningTimer,
    ]);

    const getDisplayTime = () => {
        if (timerState === "TIMING") {
            return formatTime({ time: elapsedTime });
        }
        if (timerState === "INSPECTING" || timerState === "INSPECTING_READY") {
            if (inspectionTime >= 1) return inspectionTime.toString();
            if (inspectionTime < 1 && inspectionTime >= -1) return "+2";
            return "DNF";
        }

        const latestResult = filteredResults[filteredResults.length - 1];
        if (latestResult && timerState !== "READY") {
            return formatTime({
                time: latestResult.time,
                penalty: latestResult.penalty,
                displayTimeOnDnf: true,
            });
        }
        return formatTime({ time: 0 });
    };

    const isTextGreen =
        timerState === "READY" || timerState === "INSPECTING_READY";

    return {
        displayTime: getDisplayTime(),
        timerClassName: isTextGreen ? "text-green-500" : "",
    };
};
