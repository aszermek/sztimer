import { withInspectionAtom } from "@/atoms/settingsAtoms";
import { useSpacebarTimer } from "@/hooks/domain/useSpacebarTimer";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import React from "react";

export const SpacebarTimer: React.FC = () => {
    const withInspection = useAtomValue(withInspectionAtom);
    const { displayTime, timerClassName } = useSpacebarTimer({
        withInspection,
    });

    return (
        <div className={cn("text-8xl sm:text-9xl font-timer", timerClassName)}>
            {displayTime}
        </div>
    );
};
