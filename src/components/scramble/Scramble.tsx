import {
    canGetPrevScrambleAtom,
    getNewScrambleAtom,
    goToNextScrambleAtom,
    goToPrevScrambleAtom,
    isScrambleLoadingAtom,
    scrambleAtom,
    scrambleToClipboardAtom,
} from "@/atoms/scrambleAtoms";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { selectedEventAtom } from "@/atoms/sessionAtoms";

export const Scramble: React.FC = () => {
    const scramble = useAtomValue(scrambleAtom);
    const isLoading = useAtomValue(isScrambleLoadingAtom);
    const canGetPrevScramble = useAtomValue(canGetPrevScrambleAtom);
    const selectedEvent = useAtomValue(selectedEventAtom);

    const generateScramble = useSetAtom(getNewScrambleAtom);
    const goToPrevScramble = useSetAtom(goToPrevScrambleAtom);
    const goToNextScramble = useSetAtom(goToNextScrambleAtom);
    const scrambleToClipboard = useSetAtom(scrambleToClipboardAtom);

    useEffect(() => {
        generateScramble();
    }, [generateScramble, selectedEvent]);

    const prevButton = (
        <Button
            variant="outline"
            size="icon"
            onClick={goToPrevScramble}
            disabled={!canGetPrevScramble}
        >
            <CaretLeftIcon size={16} />
        </Button>
    );

    const nextButton = (
        <Button variant="outline" size="icon" onClick={goToNextScramble}>
            <CaretRightIcon size={16} />
        </Button>
    );

    return (
        <div className="text-3xl text-center">
            <div className="hidden sm:flex flex-row gap-8 items-center">
                {prevButton}
                <div
                    className="cursor-pointer shrink-1"
                    onClick={scrambleToClipboard}
                >
                    {isLoading ? (
                        <Skeleton className="w-[80vw] h-4 rounded-full bg-gray-200" />
                    ) : (
                        scramble
                    )}
                </div>
                {nextButton}
            </div>

            <div className="sm:hidden flex flex-col gap-4">
                <div
                    className="cursor-pointer text-xl sm:text-lg"
                    onClick={scrambleToClipboard}
                >
                    {isLoading ? (
                        <Skeleton className="w-full h-[20px]" />
                    ) : (
                        scramble
                    )}
                </div>
                <div className="flex flex-row gap-4 justify-center">
                    {prevButton}
                    {nextButton}
                </div>
            </div>
        </div>
    );
};
