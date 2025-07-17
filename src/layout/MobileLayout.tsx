import { filteredResultsAtom } from "@/atoms/resultAtoms";
import { TabBar } from "@/components/common/TabBar";
import { ResultFlagger } from "@/components/results/ResultFlagger";
import { ScramblePreview } from "@/components/scramble/ScramblePreview";
import { SpacebarTimer } from "@/components/timer/SpacebarTimer";
import { useAtomValue } from "jotai";

export const MobileLayout: React.FC = () => {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const latestResult = filteredResults.at(-1);

    return (
        <>
            <div className="flex flex-col w-full h-full items-center justify-center">
                <SpacebarTimer />
                <ResultFlagger result={latestResult} />
            </div>
            <ScramblePreview />
            <TabBar />
        </>
    );
};
