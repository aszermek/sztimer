import {
    canGetPrevScrambleAtom,
    getNewScrambleAtom,
    goToNextScrambleAtom,
    goToPrevScrambleAtom,
    isScrambleLoadingAtom,
    scrambleAtom,
    scrambleToClipboardAtom,
} from "@/atoms/scrambleAtoms";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
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
                    onClick={() => goToPrevScramble()}
                >
                    <CaretLeft className="h-4 w-4" />
                </Button>
            )}
            <div
                className="cursor-pointer shrink-1"
                onClick={() => scrambleToClipboard()}
            >
                {isLoading ? "..." : scramble}
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => goToNextScramble()}
            >
                <CaretRight className="h-4 w-4" />
            </Button>
        </div>
    );
};
