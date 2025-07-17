import { filteredResultsAtom } from "@/atoms/resultAtoms";
import { TabBar, type TabKey } from "@/components/common/TabBar";
import { ResultFlagger } from "@/components/results/ResultFlagger";
import { Results } from "@/components/results/Results";
import { ScramblePreview } from "@/components/scramble/ScramblePreview";
import { Settings } from "@/components/settings/Settings";
import { Statistics } from "@/components/statistics/Statistics";
import { SpacebarTimer } from "@/components/timer/SpacebarTimer";
import { useAtomValue } from "jotai";
import { useState } from "react";

export const MobileLayout: React.FC = () => {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const latestResult = filteredResults.at(-1);

    const [activeTab, setActiveTab] = useState<TabKey>("timer");

    return (
        <>
            <div className="flex flex-col w-full h-full items-center justify-center">
                {activeTab === "timer" && (
                    <>
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <SpacebarTimer />
                            <ResultFlagger result={latestResult} />
                        </div>
                        <ScramblePreview />
                    </>
                )}
                {activeTab === "results" && <Results />}
                {activeTab === "stats" && <Statistics />}
                {activeTab === "settings" && <Settings />}
            </div>
            <TabBar activeTab={activeTab} onChange={setActiveTab} />
        </>
    );
};
