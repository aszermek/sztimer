import {
    canGetPrevScrambleAtom,
    getFirstScrambleAtom,
    goToNextScrambleAtom,
    goToPrevScrambleAtom,
    isScrambleLoadingAtom,
    scrambleAtom,
} from "@/atoms/scrambleAtoms";
import { selectedEventAtom } from "@/atoms/sessionAtoms";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const Scramble: React.FC = () => {
    const scramble = useAtomValue(scrambleAtom);
    const isLoading = useAtomValue(isScrambleLoadingAtom);
    const canGetPrevScramble = useAtomValue(canGetPrevScrambleAtom);
    const selectedEvent = useAtomValue(selectedEventAtom);

    const getFirstScramble = useSetAtom(getFirstScrambleAtom);
    const goToPrevScramble = useSetAtom(goToPrevScrambleAtom);
    const goToNextScramble = useSetAtom(goToNextScrambleAtom);

    useEffect(() => {
        getFirstScramble();
    }, [selectedEvent]);

    const scrambleToClipboard = () => {
        navigator.clipboard.writeText(scramble);
    };

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
        <div className="ScrambleFontSize text-justify font-code min-h-[45px] max-w-[1792px] flex items-center justify-center">
            {isLoading ? (
                <Skeleton className="min-w-[40vw] max-w-[1656px] h-4 rounded-full bg-gray-200" />
            ) : (
                <>
                    <div className="hidden md:flex gap-8 items-center">
                        {prevButton}
                        <div
                            className="cursor-pointer shrink-1"
                            onClick={scrambleToClipboard}
                        >
                            {scramble}
                        </div>
                        {nextButton}
                    </div>

                    <div className="md:hidden flex flex-col gap-4">
                        <div
                            className="cursor-pointer text-xl md:text-lg"
                            onClick={scrambleToClipboard}
                        >
                            {scramble}
                        </div>
                        <div className="flex gap-4 justify-center">
                            {prevButton}
                            {nextButton}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
