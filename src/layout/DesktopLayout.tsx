import { EventCombobox } from "@/components/event/EventCombobox";
// import { SessionCombobox } from "@/components/event/SessionCombobox";
import { Results } from "@/components/results/Results";
import { ScramblePreview } from "@/components/scramble/ScramblePreview";
import { Statistics } from "@/components/statistics/Statistics";
import { Timer } from "@/components/timer/Timer";

export const DesktopLayout: React.FC = () => {
    return (
        <>
            <section className="flex gap-4 flex-1 min-h-0">
                <Timer />
                <aside className="flex flex-col gap-4">
                    <EventCombobox />
                    {/* <SessionCombobox /> */}
                    <Results />
                </aside>
            </section>
            <section className="flex items-center justify-between gap-4">
                <ScramblePreview />
                <Statistics />
            </section>
        </>
    );
};
