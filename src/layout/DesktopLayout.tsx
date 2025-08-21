import { EventCombobox } from "@/components/event/EventCombobox";
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
                    <Results />
                </aside>
            </section>
            <section className="flex justify-between gap-8">
                <ScramblePreview />
                <Statistics />
            </section>
        </>
    );
};
