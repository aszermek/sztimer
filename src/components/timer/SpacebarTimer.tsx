import { withInspectionAtom } from "@/atoms/settingsAtoms";
import { useSpacebarTimer } from "@/hooks/useSpacebarTimer";
import { useAtomValue } from "jotai";
import React from "react";

export const SpacebarTimer: React.FC = () => {
    const withInspection = useAtomValue(withInspectionAtom);
    const { displayTime, timerClassName } = useSpacebarTimer({
        withInspection,
    });

    return (
        <div className={`text-8xl sm:text-9xl font-timer ${timerClassName}`}>
            {displayTime}
        </div>
    );
};
