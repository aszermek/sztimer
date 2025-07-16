import { useAtomValue } from "jotai";
import { EventCombobox } from "./components/event/EventCombobox";
import { ResultFlagger } from "./components/results/ResultFlagger";
import { Results } from "./components/results/Results";
import { Scramble } from "./components/scramble/Scramble";
import { ScramblePreview } from "./components/scramble/ScramblePreview";
import { SpacebarTimer } from "./components/timer/SpacebarTimer";
import { filteredResultsAtom } from "./atoms/resultAtoms";

function App() {
    const filteredResults = useAtomValue(filteredResultsAtom);
    const latestResult = filteredResults.at(-1);

    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 p-2 sm:p-8">
            <EventCombobox />
            <Scramble />
            <ScramblePreview />
            <SpacebarTimer />
            <ResultFlagger result={latestResult} />
            <Results />
        </main>
    );
}

export default App;
