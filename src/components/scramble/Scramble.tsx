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

export const Scramble: React.FC = () => {
    const scramble = useAtomValue(scrambleAtom);
    const isLoading = useAtomValue(isScrambleLoadingAtom);
    const canGetPrevScramble = useAtomValue(canGetPrevScrambleAtom);

    const generateScramble = useSetAtom(getNewScrambleAtom);
    const goToPrevScramble = useSetAtom(goToPrevScrambleAtom);
    const goToNextScramble = useSetAtom(goToNextScrambleAtom);
    const scrambleToClipboard = useSetAtom(scrambleToClipboardAtom);

    useEffect(() => {
        generateScramble();
    }, [generateScramble]);

    return (
        <div className="text-3xl text-center flex flex-row gap-8">
            {canGetPrevScramble && (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevScramble}
                >
                    <CaretLeftIcon size={16} />
                </Button>
            )}
            <div
                className="cursor-pointer shrink-1"
                onClick={scrambleToClipboard}
            >
                {isLoading ? "..." : scramble}
            </div>
            <Button variant="outline" size="icon" onClick={goToNextScramble}>
                <CaretRightIcon size={16} />
            </Button>
        </div>
    );
};
