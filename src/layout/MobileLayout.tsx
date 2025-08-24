import { TabBar, type TabKey } from "@/components/common/TabBar";
import { Results } from "@/components/results/Results";
import { Scramble } from "@/components/scramble/Scramble";
import { ScramblePreview } from "@/components/scramble/ScramblePreview";
import { Settings } from "@/components/settings/Settings";
import { Statistics } from "@/components/statistics/Statistics";
import { Timer } from "@/components/timer/Timer";
import { useState } from "react";

export const MobileLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>("timer");

    return (
        <div className="flex flex-col h-full w-full">
            {activeTab === "timer" && <Scramble />}
            <div className="flex flex-col gap-6 w-full max-w-screen flex-1 min-h-0 overflow-y-auto items-center justify-center p-2 sm:p-6">
                {activeTab === "timer" && (
                    <>
                        <Timer />
                        <ScramblePreview />
                    </>
                )}
                {activeTab === "results" && <Results />}
                {activeTab === "stats" && <Statistics />}
                {activeTab === "settings" && <Settings />}
            </div>

            <TabBar activeTab={activeTab} onChange={setActiveTab} />
        </div>
    );
};
