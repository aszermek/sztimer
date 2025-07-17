import { useAtomValue } from "jotai";
import { filteredResultsAtom } from "./atoms/resultAtoms";
import { EventCombobox } from "./components/event/EventCombobox";
import { Header } from "./components/header/Header";
import { ResultFlagger } from "./components/results/ResultFlagger";
import { Results } from "./components/results/Results";
import { Scramble } from "./components/scramble/Scramble";
import { ScramblePreview } from "./components/scramble/ScramblePreview";
import { Statistics } from "./components/statistics/Statistics";
import { SpacebarTimer } from "./components/timer/SpacebarTimer";

function App() {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const latestResult = filteredResults.at(-1);

    return (
        <main className="bg-gray-50 w-screen h-screen flex flex-col items-between justify-center">
            <Header />
            <section className="flex justify-center gap-8 bg-white border-b border-b-border px-4 py-3">
                <Scramble />
            </section>
            <div className="flex flex-col gap-2 sm:gap-4 w-full flex-1 min-h-0 max-w-[1478px] mx-auto p-2 sm:p-8">
                <section className="flex gap-4 flex-1 min-h-0">
                    <div className="flex flex-col w-full items-center justify-center">
                        <div className="flex flex-col w-full h-full items-center justify-center">
                            <SpacebarTimer />
                            <ResultFlagger result={latestResult} />
                        </div>
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
            </div>
        </main>
    );
}

export default App;
