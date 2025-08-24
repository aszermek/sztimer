import { isScrambleLoadingAtom, scrambleAtom } from "@/atoms/scrambleAtoms";
import { selectedEventAtom } from "@/atoms/sessionAtoms";
import { drawScramble } from "@/lib/drawScramble";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef } from "react";
import { ScramblePreviewSkeleton } from "./ScramblePreviewSkeleton";

export const ScramblePreview: React.FC = () => {
    const scramble = useAtomValue(scrambleAtom);
    const isLoading = useAtomValue(isScrambleLoadingAtom);
    const eventKey = useAtomValue(selectedEventAtom);

    const previewRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (previewRef.current) {
            drawScramble(eventKey, scramble, previewRef.current);
        }
    }, [scramble, eventKey]);

    if (isLoading) {
        return <ScramblePreviewSkeleton />;
    }

    return (
        <div
            ref={previewRef}
            className="mx-auto h-32 sm:h-40 xl:h-48 aspect-video"
        />
    );
};
