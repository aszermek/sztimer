import { EventCombobox } from "./components/event/EventCombobox";
import { Results } from "./components/results/Results";
import { Scramble } from "./components/scramble/Scramble";
import { SpacebarTimer } from "./components/timer/SpacebarTimer";

function App() {
    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 p-2 sm:p-8">
            <EventCombobox />
            <Scramble />
            <SpacebarTimer />
            <Results />
        </main>
    );
}

export default App;
