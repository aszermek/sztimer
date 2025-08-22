import { TabBar, type TabKey } from "@/components/common/TabBar";
import { Results } from "@/components/results/Results";
import { ScramblePreview } from "@/components/scramble/ScramblePreview";
import { Settings } from "@/components/settings/Settings";
import { Statistics } from "@/components/statistics/Statistics";
import { Timer } from "@/components/timer/Timer";
import { useState } from "react";

export const MobileLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>("timer");

    return (
        // --- THE FIX STARTS HERE ---
        // 1. Use a div as the root instead of a Fragment, and make it a flex container
        //    that fills the height of its parent (<main>).
        <div className="flex flex-col h-full w-full">
            {/* 2. This content area now grows to fill available space (`flex-1`)
                   and handles its own scrolling (`overflow-y-auto`).
                   `min-h-0` is a crucial flexbox property that allows shrinking. */}
            <div className="flex flex-col w-full flex-1 min-h-0 overflow-y-auto items-center justify-center p-2 md:p-6">
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

            {/* 3. The TabBar is now a sibling flex item and will be pushed to the bottom. */}
            <TabBar activeTab={activeTab} onChange={setActiveTab} />
        </div>
    );
};
