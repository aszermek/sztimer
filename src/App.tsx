import { Header } from "./components/header/Header";
import { Scramble } from "./components/scramble/Scramble";
import { DesktopLayout } from "./layout/DesktopLayout";
import { MobileLayout } from "./layout/MobileLayout";

function App() {
    return (
        <div className="bg-gray-50 w-screen h-screen flex flex-col items-between justify-center overflow-hidden">
            <Header />

            <section className="flex justify-center gap-8 bg-white border-b border-b-border px-4 py-3">
                <Scramble />
            </section>

            <main className="hidden lg:flex flex-col gap-2 md:gap-4 w-full flex-1 min-h-0 max-w-[1478px] mx-auto p-2 md:p-8">
                <DesktopLayout />
            </main>

            <main className="flex lg:hidden flex-col items-center gap-2 md:gap-4 w-full flex-1 min-h-0 max-w-[1478px] mx-auto">
                <MobileLayout />
            </main>
        </div>
    );
}

export default App;
