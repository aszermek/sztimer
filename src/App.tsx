import { Header } from "./components/header/Header";
import { Scramble } from "./components/scramble/Scramble";
import { useMediaQuery } from "./hooks/useMediaQuery"; // <-- IMPORT THE HOOK
import { DesktopLayout } from "./layout/DesktopLayout";
import { MobileLayout } from "./layout/MobileLayout";

function App() {
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    return (
        <div className="bg-gray-50 w-screen h-screen flex flex-col items-between justify-center overflow-hidden">
            <Header />

            <section className="flex justify-center gap-8 bg-white border-b border-b-border px-4 py-3">
                <Scramble />
            </section>

            <main className="flex flex-col gap-2 md:gap-4 lg:p-4 w-full flex-1 min-h-0 max-w-[1478px] mx-auto">
                {isDesktop ? <DesktopLayout /> : <MobileLayout />}
            </main>
        </div>
    );
}

export default App;
