import { addResultAtom, filteredResultsAtom } from "@/atoms/resultAtoms";
import { scrambleAtom } from "@/atoms/scrambleAtoms";
import { selectedEventAtom, selectedSessionAtom } from "@/atoms/sessionAtoms";
import { timerModeAtom } from "@/atoms/settingsAtoms";
import { formatTime } from "@/lib/formatTime";
import type { PenaltyType, Result } from "@/types/results";
import { useAtomValue, useSetAtom } from "jotai";
import { ResultFlagger } from "../results/ResultFlagger";
import { SpacebarTimer } from "./SpacebarTimer";
import { TimeInput } from "./TimeInput";

export const Timer: React.FC = () => {
    const timerMode = useAtomValue(timerModeAtom);
    const filteredResults = useAtomValue(filteredResultsAtom);
    const latestResult = filteredResults.at(-1);
    const addResult = useSetAtom(addResultAtom);
    const scramble = useAtomValue(scrambleAtom);
    const selectedEvent = useAtomValue(selectedEventAtom);
    const selectedSession = useAtomValue(selectedSessionAtom);

    const handleManualSubmit = ({
        timeInSeconds,
        penalty,
    }: {
        timeInSeconds: number;
        penalty: PenaltyType;
    }) => {
        const newResult: Result = {
            time: timeInSeconds,
            penalty,
            scramble,
            date: new Date(),
            event: selectedEvent,
            session: selectedSession,
            comment: "",
        };
        addResult(newResult);
    };

    if (timerMode === "manual") {
        return (
            <div className="flex-1 flex flex-col gap-4 justify-center max-w-lg mx-auto">
                <TimeInput onSubmit={handleManualSubmit} />
                {!!latestResult && (
                    <div className="flex items-center gap-4 justify-between">
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">
                                Latest result:
                            </p>
                            <div className={`text-6xl font-timer`}>
                                {formatTime(latestResult)}
                            </div>
                        </div>
                        <ResultFlagger result={latestResult} />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <SpacebarTimer />
            <ResultFlagger result={latestResult} />
        </div>
    );
};
