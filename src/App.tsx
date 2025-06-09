import { Scramble } from "./components/scramble/Scramble";
import { SpacebarTimer } from "./components/timer/SpacebarTimer";

function App() {
    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 gap-4 p-8">
            <Scramble />
            <SpacebarTimer />
        </main>
    );
}

export default App;
