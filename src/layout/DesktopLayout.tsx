import { filteredResultsAtom } from "@/atoms/resultAtoms";
import { EventCombobox } from "@/components/event/EventCombobox";
import { ResultFlagger } from "@/components/results/ResultFlagger";
import { Results } from "@/components/results/Results";
import { ScramblePreview } from "@/components/scramble/ScramblePreview";
import { Statistics } from "@/components/statistics/Statistics";
import { SpacebarTimer } from "@/components/timer/SpacebarTimer";
import { useAtomValue } from "jotai";

export const DesktopLayout: React.FC = () => {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const latestResult = filteredResults.at(-1);

    return (
        <>
            <section className="flex gap-4 flex-1 min-h-0">
                <div className="flex flex-col w-full h-full items-center justify-center">
                    <SpacebarTimer />
                    <ResultFlagger result={latestResult} />
                </div>
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
